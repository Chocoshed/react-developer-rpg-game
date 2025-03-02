import React, { useState, useContext } from 'react';
import { levelData } from '../../data/level_data';
import Button from '../common/Button';
import notCompletedImage from '../../assets/images/notCompleted.png';
import completedImage from '../../assets/images/completed.png';
import chevronLeft from '../../assets/svg/chevron-left.svg';
import chevronRight from '../../assets/svg/chevron-right.svg';
import { GameContext } from '../../contexts/GameContext';

const Level = ({ onSelectBattle }) => {
    const [shownLevel, setShownLevel] = useState(0);
    const { gameState } = useContext(GameContext);

    const handleNextLevel = () => {
        if (shownLevel < levelData.length - 2) {
            setShownLevel(prev => prev + 1);
        }
    };

    const handlePreviousLevel = () => {
        if (shownLevel > 0) {
            setShownLevel(prev => prev - 1);
        }
    };

    // Vérifier si le niveau suivant existe
    const hasNextLevel = shownLevel + 1 < levelData.length;

    // Vérifier si un niveau est complété
    const isLevelCompleted = (levelIndex) => {
        return gameState.completedLevels.includes(levelIndex);
    };

    return (
        <>
            <div className="level-selection-container">
                <div
                    className="level-selection"
                    onClick={() => onSelectBattle(shownLevel)}
                >
                    <img
                        src={isLevelCompleted(shownLevel) ? completedImage : notCompletedImage}
                        alt={isLevelCompleted(shownLevel) ? "Niveau complété" : "Niveau non complété"}
                    />
                    <h3>Niveau {levelData[shownLevel].level}</h3>
                </div>

                {hasNextLevel && (
                    <div
                        className="level-selection"
                        onClick={() => onSelectBattle(shownLevel + 1)}
                    >
                        <img
                            src={isLevelCompleted(shownLevel + 1) ? completedImage : notCompletedImage}
                            alt={isLevelCompleted(shownLevel + 1) ? "Niveau complété" : "Niveau non complété"}
                        />
                        <h3>Niveau {levelData[shownLevel + 1].level}</h3>
                    </div>
                )}
            </div>

            <div className="level-selection-buttons">
                <Button
                    onClick={handlePreviousLevel}
                    disabled={shownLevel === 0}
                >
                    <img src={chevronLeft} alt="Previous" />
                </Button>
                <Button
                    onClick={handleNextLevel}
                    disabled={shownLevel === levelData.length - 2}
                >
                    <img src={chevronRight} alt="Previous" />
                </Button>
            </div>
        </>
    );
};

export default Level;