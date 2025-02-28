import React, { useState, useContext } from 'react';
import Level from '../components/Level';
import LevelScreen from './LevelScreen';
import { GameContext } from '../contexts/GameContext';

const MenuScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('level');
    const [selectedLevelIndex, setSelectedLevelIndex] = useState(null);
    const { gameState } = useContext(GameContext);

    const handleSelectBattle = (levelIndex) => {
        setSelectedLevelIndex(levelIndex);
        setCurrentScreen('battle');
    };

    const handleReturnToLevelSelect = () => {
        setCurrentScreen('level');
    };

    return (
        <div class="screen">
            {currentScreen === 'level' ? (
                <>
                    <div class="menu-header">
                        <p>{ gameState.playerPseudo }</p>
                    </div>
                    <Level onSelectBattle={handleSelectBattle} />
                </>
            ) : (
                <LevelScreen
                    levelIndex={selectedLevelIndex}
                    onBack={handleReturnToLevelSelect}
                />
            )}
        </div>
    );
};

export default MenuScreen;