// src/screens/BattleScreen.jsx
import React, { useEffect, useState, useContext } from 'react';
import { levelData } from '../data/level_data';
import Button from '../components/common/Button';
import { GameContext } from '../contexts/GameContext';

const BattleScreen = ({ levelIndex, onBack }) => {
    const [currentLevel, setCurrentLevel] = useState(null);
    const { gameState } = useContext(GameContext);

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

    return (
        <div className="battle-screen">
            <header>
                <h2>Combat - Niveau {currentLevel.level}</h2>
            </header>

            <div className="battle-content">
                <div className="combat-area">
                    <div className="enemy-side">
                        <p className="enemy-name">{currentLevel.enemyData.name}</p>
                        <div className="battle-enemy-profile">
                            <div className="stats">
                                <p>PV : {currentLevel.enemyData.hp}</p>
                            </div>
                            <img src={currentLevel.enemyData.image} alt={currentLevel.enemyData.name} />
                        </div>
                    </div>
                    <div className="player-side">
                        <p>{gameState.playerPseudo}</p>
                    </div>
                </div>
            </div>

            <div className="actions">
                <Button onClick={onBack}>
                    Abandonner le combat
                </Button>
            </div>
        </div>
    );
};

export default BattleScreen;