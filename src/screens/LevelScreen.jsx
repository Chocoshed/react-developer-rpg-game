import React, { useEffect, useState } from 'react';
import { levelData } from '../data/level_data';
import Button from '../components/common/Button';
import EnemyProfile from '../components/level/EnemyProfile';
import DevTool from '../components/level/DevTool';

const LevelScreen = ({ levelIndex, onBack, onStartBattle }) => {
    const [currentLevel, setCurrentLevel] = useState(null);
    const screens = ['enemy', 'util'];
    const [actifScreenIndex, setActifScreenIndex] = useState(0);

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

    useEffect(() => {
        // Charger les données du niveau sélectionné
        if (levelIndex !== null && levelData[levelIndex]) {
            setCurrentLevel(levelData[levelIndex]);
        }
    }, [levelIndex]);

    // Si les données du niveau ne sont pas encore chargées
    if (!currentLevel) {
        return <div>Chargement du niveau...</div>;
    }

    // Vérifier si on est à la dernière fenêtre
    const isLastScreen = actifScreenIndex === screens.length - 1;

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

            <div className="actions">
                <Button onClick={handlePreviousScreen}>
                    Précédent
                </Button>

                {/* Afficher "Suivant" ou "Combattre" selon la position */}
                {isLastScreen ? (
                    <Button onClick={onStartBattle}>
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