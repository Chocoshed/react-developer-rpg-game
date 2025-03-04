import React, { useEffect, useState } from 'react';
import { levelData } from '../data/level_data';
import Button from '../components/common/Button';
import EnemyProfile from '../components/level/EnemyProfile';
import DevTool from '../components/level/DevTool';
import WeaponSelection from '../components/level/WeaponSelection';

const LevelScreen = ({ levelIndex, onBack, onStartBattle }) => {
    const [currentLevel, setCurrentLevel] = useState(null);
    // État pour stocker l'arme sélectionnée pour les niveaux où il faut choisir
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [actifScreenIndex, setActifScreenIndex] = useState(0);

    // Définir les écrans disponibles en fonction du niveau
    const [screens, setScreens] = useState(['enemy']);

    useEffect(() => {
        // Charger les données du niveau sélectionné
        if (levelIndex !== null && levelData[levelIndex]) {
            const level = levelData[levelIndex];
            setCurrentLevel(level);

            // Réinitialiser la sélection d'arme à chaque changement de niveau
            setSelectedWeapon(null);

            // Définir les écrans disponibles en fonction du niveau
            const newScreens = ['enemy'];

            // Si le niveau a un devToolId, afficher l'écran d'information sur l'arme
            // Sinon, afficher l'écran de sélection d'arme
            if (level.devToolId) {
                newScreens.push('util');
            } else {
                newScreens.push('weapon');
            }

            setScreens(newScreens);
            setActifScreenIndex(0); // Revenir au premier écran
        }
    }, [levelIndex]);

    const handleNextScreen = () => {
        if (actifScreenIndex < screens.length - 1) {
            setActifScreenIndex(actifScreenIndex + 1);
        }
    };

    const handlePreviousScreen = () => {
        if (actifScreenIndex > 0) {
            setActifScreenIndex(actifScreenIndex - 1);
        }
    };

    // Gérer la sélection d'une arme
    const handleSelectWeapon = (weaponId, weaponData) => {
        setSelectedWeapon({
            id: weaponId,
            data: weaponData
        });
    };

    // Si les données du niveau ne sont pas encore chargées
    if (!currentLevel) {
        return <div>Chargement du niveau...</div>;
    }

    // Vérifier si on est à la dernière fenêtre
    const isLastScreen = actifScreenIndex === screens.length - 1;

    // Vérifier si le bouton "Combattre" doit être désactivé
    // Si nous sommes sur l'écran de sélection d'arme et qu'aucune arme n'est sélectionnée
    const isFightButtonDisabled =
        screens[actifScreenIndex] === 'weapon' && !selectedWeapon;

    // Gérer le style du bouton désactivé
    const buttonStyle = isFightButtonDisabled ?
        { opacity: 0.5, cursor: 'not-allowed' } : {};

    return (
        <div className="battle-screen">
            <div className="battle-header">
                <Button onClick={onBack}>
                    Retour
                </Button>
                <h2>Niveau {currentLevel.level}</h2>
                <span></span>
            </div>

            {screens[actifScreenIndex] === 'enemy' && (
                <EnemyProfile currentLevel={currentLevel} />
            )}

            {screens[actifScreenIndex] === 'util' && (
                <DevTool currentLevel={currentLevel} />
            )}

            {screens[actifScreenIndex] === 'weapon' && (
                <WeaponSelection onSelectWeapon={handleSelectWeapon} />
            )}

            <div className="actions">
                <Button onClick={handlePreviousScreen} disabled={actifScreenIndex === 0}>
                    Précédent
                </Button>

                {/* Afficher "Suivant" ou "Combattre" selon la position */}
                {isLastScreen ? (
                    <Button
                        onClick={isFightButtonDisabled ? null : () => onStartBattle(selectedWeapon)}
                        style={buttonStyle}
                    >
                        Combattre
                    </Button>
                ) : (
                    <Button onClick={handleNextScreen}>
                        Suivant
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LevelScreen;