import React, { useEffect, useState, useContext, useRef } from 'react';
import { levelData } from '../data/level_data';
import { GameContext } from '../contexts/GameContext';
import HealthBar from '../components/battle/HealthBar';
import EnergyBar from '../components/battle/EnergyBar';
import ActionsMenu from '../components/battle/ActionsMenu';
import LastAction from '../components/battle/LastAction';
import BattleLog from '../components/battle/BattleLog';
import useBattleLogic from '../utils/hooks/useBattleLogic';

const BattleScreen = ({ levelIndex, onBack, onReturnToMenu }) => {
    // Tous les hooks en haut du composant
    const [currentLevel, setCurrentLevel] = useState(null);
    const { gameState, completeLevel } = useContext(GameContext);
    const [victoryProcessed, setVictoryProcessed] = useState(false);

    // État pour contrôler l'affichage de l'écran de victoire
    const [showVictoryScreen, setShowVictoryScreen] = useState(false);

    const enemyRef = useRef(null);

    // Définitions des valeurs par défaut
    const [enemy, setEnemy] = useState({ hp: 10, name: "Ennemi" });
    const [devTool, setDevTool] = useState({
        normalAttack: { name: "Attaque", damage: 1, description: "Attaque standard" }
    });

    // Logique de combat
    const { battleState, playerAttack } = useBattleLogic(
        gameState,
        enemy,
        devTool
    );

    // Charger les données du niveau
    useEffect(() => {
        if (levelIndex !== null && levelData[levelIndex]) {
            const level = levelData[levelIndex];
            setCurrentLevel(level);

            if (level.enemyData) {
                setEnemy(level.enemyData);
            }

            if (level.devToolData) {
                setDevTool(level.devToolData);
            }

            // Réinitialiser les états
            setVictoryProcessed(false);
            setShowVictoryScreen(false);
        }
    }, [levelIndex]);

    // Vérifier la fin du combat et afficher l'écran de victoire
    useEffect(() => {
        // Si les PV de l'ennemi sont à 0 ou moins et la victoire n'est pas encore traitée
        if (battleState.enemyHP <= 0 && battleState.isEnded && battleState.winner === 'player') {

            // Marquer le niveau comme complété
            if (!victoryProcessed) {
                completeLevel(levelIndex);
                setVictoryProcessed(true);
                console.log(`Niveau ${levelIndex} marqué comme complété !`);

                // Délai court avant d'afficher l'écran de victoire pour laisser le temps aux animations
                setTimeout(() => {
                    setShowVictoryScreen(true);
                }, 500);
            }
        }
    }, [battleState.enemyHP, battleState.isEnded, battleState.winner, completeLevel, levelIndex, victoryProcessed]);

    // Gestionnaire pour l'action d'attaque
    const handleAttack = (attackType) => {
        if (showVictoryScreen) return;

        const result = playerAttack(attackType);

        if (enemyRef.current && result) {
            enemyRef.current.classList.add('damage-animation');

            setTimeout(() => {
                if (enemyRef.current) {
                    enemyRef.current.classList.remove('damage-animation');
                }
            }, 500);
        }
    };

    // Gestionnaire pour l'action de fuite
    const handleFlee = () => {
        onReturnToMenu(); 
    };

    // Afficher un message de chargement si les données du niveau ne sont pas encore chargées
    if (!currentLevel) {
        return <div className="battle-screen">Chargement du niveau...</div>;
    }

    // Afficher l'écran de victoire
    if (showVictoryScreen) {
        const isAlreadyCompleted = gameState.completedLevels.filter(lvl => lvl === levelIndex).length > 1;
        const completionMessage = isAlreadyCompleted
            ? `Vous avez déjà complété le niveau ${currentLevel.level} auparavant !`
            : `Niveau ${currentLevel.level} complété ! Vous avez débloqué le niveau suivant !`;

        return (
            <div className="battle-screen">

                <div className="battle-content victory-screen">
                    <h3>Victoire !</h3>
                    <p>Vous avez vaincu {enemy.name} !</p>
                    <p className="completion-message">{completionMessage}</p>

                    <BattleLog logs={battleState.actions} className="victory-battle-log" />

                    <button
                        onClick={onReturnToMenu} 
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

    // Afficher l'écran de combat normal
    return (
        <div className="battle-screen">
            <header>
                <h2>Combat - Niveau {currentLevel.level}</h2>
            </header>

            <div className="battle-content">
                <div className="combat-area">
                    <div className="player-side">
                        <p className="player-name">{gameState.playerPseudo}</p>
                        <div className="battle-player-profile">
                            <HealthBar
                                currentHP={battleState.playerHP}
                                maxHP={gameState.playerHP}
                                name={gameState.playerPseudo}
                            />
                            <EnergyBar
                                currentEnergy={battleState.playerEnergy}
                                maxEnergy={battleState.maxEnergy}
                            />
                        </div>
                    </div>
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

                </div>

                <LastAction message={battleState.lastAction} />
            </div>

            <div className="battle-actions">
                <ActionsMenu
                    onAttack={handleAttack}
                    onFlee={handleFlee}
                    devTool={devTool}
                    currentEnergy={battleState.playerEnergy}
                />
            </div>
        </div>
    );
};

export default BattleScreen;