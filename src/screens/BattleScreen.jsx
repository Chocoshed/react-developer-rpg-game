import React, { useEffect, useState, useContext, useRef } from 'react';
import { levelData } from '../data/level_data';
import { GameContext } from '../contexts/GameContext';
import HealthBar from '../components/battle/HealthBar';
import ActionsMenu from '../components/battle/ActionsMenu';
import BattleLog from '../components/battle/BattleLog';
import LastAction from '../components/battle/LastAction';
import useBattleLogic from '../utils/hooks/useBattleLogic';

const BattleScreen = ({ levelIndex, onBack }) => {
    const [currentLevel, setCurrentLevel] = useState(null);
    const { gameState } = useContext(GameContext);
    const enemyRef = useRef(null);

    // Définitions des valeurs par défaut pour éviter les erreurs
    const defaultEnemy = { hp: 10, name: "Ennemi" };
    const defaultDevTool = {
        normalAttack: { name: "Attaque", damage: 1, description: "Attaque standard" }
    };

    // État local pour les données de combat, initialisé avec des valeurs par défaut
    const [enemy, setEnemy] = useState(defaultEnemy);
    const [devTool, setDevTool] = useState(defaultDevTool);

    // Utiliser le hook de logique de combat - toujours appelé au même endroit
    const { battleState, playerAttack, resetBattle } = useBattleLogic(
        gameState,
        enemy,
        devTool
    );

    useEffect(() => {
        // Charger les données du niveau sélectionné
        if (levelIndex !== null && levelData[levelIndex]) {
            const level = levelData[levelIndex];
            setCurrentLevel(level);

            // Mettre à jour les données de l'ennemi et de l'outil
            if (level.enemyData) {
                setEnemy(level.enemyData);
            }

            if (level.devToolData) {
                setDevTool(level.devToolData);
            }
        }
    }, [levelIndex]);

    // Gestionnaire pour l'action d'attaque
    const handleAttack = (attackType) => {
        // Exécuter l'attaque
        const result = playerAttack(attackType);

        // Ajouter une animation de dégâts à l'ennemi
        if (enemyRef.current && result) {
            enemyRef.current.classList.add('damage-animation');

            // Retirer la classe après l'animation
            setTimeout(() => {
                if (enemyRef.current) {
                    enemyRef.current.classList.remove('damage-animation');
                }
            }, 500);
        }
    };

    // Gestionnaire pour l'action de fuite
    const handleFlee = () => {
        onBack();
    };

    // Afficher un message de chargement si les données du niveau ne sont pas encore chargées
    if (!currentLevel) {
        return <div className="battle-screen">Chargement du niveau...</div>;
    }

    // Afficher un message de victoire si le combat est terminé
    if (battleState.isEnded && battleState.winner === 'player') {
        return (
            <div className="battle-screen">
                <header>
                    <h2>Combat Terminé - Niveau {currentLevel.level}</h2>
                </header>

                <div className="battle-content victory-screen">
                    <h3>Victoire !</h3>
                    <p>Vous avez vaincu {enemy.name} !</p>

                    {/* Afficher le journal de combat UNIQUEMENT à la fin */}
                    <div className="battle-log">
                        <h4>Journal de combat :</h4>
                        {battleState.logs.map((log, index) => (
                            <p key={index} className="log-entry">{log}</p>
                        ))}
                    </div>

                    <button
                        onClick={onBack}
                        className="action-button"
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#43b563',
                            color: 'white'
                        }}
                    >
                        Retour au menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="battle-screen">
            <header>
                <h2>Combat - Niveau {currentLevel.level}</h2>
            </header>

            <div className="battle-content">
                {/* Zone d'affichage des combattants */}
                <div className="combat-area">
                    {/* Côté ennemi */}
                    <div className="enemy-side">
                        <p className="enemy-name">{enemy.name}</p>
                        <div className="battle-enemy-profile">
                            <HealthBar
                                currentHP={battleState.enemyHP}
                                maxHP={enemy.hp}
                                name={enemy.name}
                                isEnemy={true}
                            />
                            <div ref={enemyRef}>
                                <img src={enemy.image} alt={enemy.name} />
                            </div>
                        </div>
                    </div>

                    {/* Côté joueur */}
                    <div className="player-side">
                        <p className="player-name">{gameState.playerPseudo}</p>
                        <div className="battle-player-profile">
                            <HealthBar
                                currentHP={battleState.playerHP}
                                maxHP={gameState.playerHP}
                                name={gameState.playerPseudo}
                            />
                            {/* Image du joueur ou de l'arme pourrait être ajoutée ici */}
                        </div>
                    </div>
                </div>

                {/* Le journal de combat n'est plus affiché pendant le combat */}
                {/* À la place, on affiche uniquement la dernière action */}
                <LastAction message={battleState.lastAction} />
            </div>

            {/* Menu d'actions */}
            <div className="battle-actions">
                <ActionsMenu
                    onAttack={handleAttack}
                    onFlee={handleFlee}
                    devTool={devTool}
                />
            </div>
        </div>
    );
};

export default BattleScreen;