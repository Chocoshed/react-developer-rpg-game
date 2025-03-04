import React, { useEffect, useState, useContext, useRef } from 'react';
import { levelData } from '../data/level_data';
import { GameContext } from '../contexts/GameContext';
import HealthBar from '../components/battle/HealthBar';
import EnergyBar from '../components/battle/EnergyBar';
import ActionsMenu from '../components/battle/ActionsMenu';
import LastAction from '../components/battle/LastAction';
import BattleLog from '../components/battle/BattleLog';
import useBattleLogic from '../utils/hooks/useBattleLogic';
import playerAnimated from '../assets/images/player_animated.gif';
import playerAttack from '../assets/images/player_attack.gif';

const BattleScreen = ({ levelIndex, selectedWeapon, onBack, onReturnToMenu }) => {
    // Tous les hooks en haut du composant
    const [currentLevel, setCurrentLevel] = useState(null);
    const { gameState, completeLevel } = useContext(GameContext);
    const [victoryProcessed, setVictoryProcessed] = useState(false);

    // État pour contrôler l'affichage de l'écran de victoire
    const [showVictoryScreen, setShowVictoryScreen] = useState(false);

    const enemyRef = useRef(null);
    const enemyImageRef = useRef(null);
    const playerRef = useRef(null);
    const playerImageRef = useRef(null);

    // État pour gérer l'animation d'attaque du joueur
    const [playerAttacking, setPlayerAttacking] = useState(false);

    // Définitions des valeurs par défaut
    const [enemy, setEnemy] = useState({ hp: 10, name: "Ennemi" });
    const [devTool, setDevTool] = useState({
        normalAttack: { name: "Attaque", damage: 1, description: "Attaque standard" }
    });

    // Logique de combat
    const { battleState, playerAttack: executePlayerAttack } = useBattleLogic(
        gameState,
        enemy,
        devTool
    );

    // Chargement des données du niveau
    useEffect(() => {
        if (levelIndex !== null && levelData[levelIndex]) {
            const level = levelData[levelIndex];
            setCurrentLevel(level);

            if (level.enemyData) {
                setEnemy(level.enemyData);
            }

            // Si le niveau a un devToolId défini, utiliser l'arme par défaut du niveau
            if (level.devToolId) {
                setDevTool(level.devToolData);
            }
            // Si une arme a été sélectionnée pour ce niveau (quand il n'y a pas de devToolId)
            else if (selectedWeapon) {
                setDevTool(selectedWeapon.data);

                // Vérifier si l'arme choisie correspond à la faiblesse de l'ennemi
                const isWeakness = level.enemyData.weakness === selectedWeapon.id;

                // Si ce n'est pas la bonne arme, réduire les dégâts à 1
                if (!isWeakness) {
                    const weakerWeapon = {
                        ...selectedWeapon.data,
                        normalAttack: {
                            ...selectedWeapon.data.normalAttack,
                            damage: 1
                        },
                        specialAttack: {
                            ...selectedWeapon.data.specialAttack,
                            damage: 1
                        }
                    };
                    setDevTool(weakerWeapon);
                }
            }

            // Réinitialiser les états
            setVictoryProcessed(false);
            setShowVictoryScreen(false);
        }
    }, [levelIndex, selectedWeapon]);


    // Vérifier la fin du combat et afficher l'écran de victoire
    useEffect(() => {
        // Si les PV de l'ennemi sont à 0 ou moins et la victoire n'est pas encore traitée
        if (battleState.isEnded && battleState.winner === 'player' && !victoryProcessed) {
            completeLevel(levelIndex);
            setVictoryProcessed(true);
            // console.log(`Niveau ${levelIndex} marqué comme complété !`);

            // Délai court avant d'afficher l'écran de victoire pour laisser le temps aux animations
            setTimeout(() => {
                setShowVictoryScreen(true);
            }, 500);
        }
    }, [battleState.isEnded, battleState.winner, completeLevel, levelIndex, victoryProcessed]);

    // Gérer l'animation de l'ennemi
    useEffect(() => {
        if (enemy && enemyRef.current && enemyImageRef.current) {
            // Change to attack image when enemy is attacking
            enemyImageRef.current.src = battleState.enemyAttacking
                ? enemy.imageAttack || enemy.image
                : enemy.image;

            // Add animation class to shake the enemy a bit
            if (battleState.enemyAttacking) {
                enemyRef.current.classList.add('enemy-attacking');
            } else {
                enemyRef.current.classList.remove('enemy-attacking');
            }
        }
    }, [battleState.enemyAttacking, enemy]);

    // Gérer l'animation du joueur
    useEffect(() => {
        if (playerRef.current && playerImageRef.current) {
            // Changer l'image du joueur lors d'une attaque
            playerImageRef.current.src = playerAttacking ? playerAttack : playerAnimated;

            // Ajouter la classe d'animation
            if (playerAttacking) {
                playerRef.current.classList.add('player-attacking');
            } else {
                playerRef.current.classList.remove('player-attacking');
            }
        }
    }, [playerAttacking]);

    // Gérer l'animation de dégâts pour le joueur lorsque l'ennemi attaque
    useEffect(() => {
        if (playerRef.current && battleState.enemyAttacking) {
            // Après un petit délai pour que l'animation d'attaque de l'ennemi commence
            setTimeout(() => {
                playerRef.current.classList.add('damage-animation');

                // Retirer la classe après l'animation
                setTimeout(() => {
                    if (playerRef.current) {
                        playerRef.current.classList.remove('damage-animation');
                    }
                }, 500);
            }, 300);
        }
    }, [battleState.enemyAttacking]);

    // Gestionnaire pour l'action d'attaque
    const handleAttack = (attackType) => {
        if (showVictoryScreen || !battleState.playerCanAct) return;

        // Déclencher l'animation d'attaque du joueur
        setPlayerAttacking(true);

        // Attendre un court délai avant d'exécuter l'attaque réelle
        setTimeout(() => {
            const result = executePlayerAttack(attackType);

            if (enemyRef.current && result) {
                enemyRef.current.classList.add('damage-animation');

                setTimeout(() => {
                    if (enemyRef.current) {
                        enemyRef.current.classList.remove('damage-animation');
                    }
                }, 500);
            }

            // Remettre l'animation du joueur à l'état normal après un délai
            setTimeout(() => {
                setPlayerAttacking(false);
            }, 400);
        }, 300);
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

    if (battleState.isEnded && battleState.winner === 'enemy') {
        return (
            <div className="battle-screen">
                <div className="battle-content defeat-screen">
                    <h3>Défaite !</h3>
                    <p>Vous avez été vaincu par {enemy.name} !</p>

                    <BattleLog logs={battleState.actions} className="defeat-battle-log" />

                    <button
                        onClick={onReturnToMenu}
                        className="action-button"
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#e74c3c',
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
                            <div ref={playerRef} className={`player-container ${playerAttacking ? 'player-attacking' : ''}`}>
                                <img
                                    ref={playerImageRef}
                                    src={playerAnimated}
                                    alt={gameState.playerPseudo}
                                />
                            </div>
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

                            <div ref={enemyRef} className={`enemy-container ${battleState.enemyAttacking ? 'enemy-attacking' : ''}`}>
                                <img
                                    ref={enemyImageRef}
                                    src={enemy.image}
                                    alt={enemy.name}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="battle-actions">
                <ActionsMenu
                    onAttack={handleAttack}
                    onFlee={handleFlee}
                    devTool={devTool}
                    currentEnergy={battleState.playerEnergy}
                    playerCanAct={battleState.playerCanAct}
                />
            </div>
            <LastAction message={battleState.lastAction} />

        </div>
    );
};

export default BattleScreen;