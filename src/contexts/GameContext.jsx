// src/contexts/GameContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { saveGameData, loadGameData, clearGameData } from '../utils/localStorage';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    // Default initial state
    const [gameState, setGameState] = useState({
        level: 1,
        playerPseudo: '',
        playerHP: 20,
        actualLevel: 1,
        lastLevelPlayed: null,
        completedLevels: [],
    });

    // Flag to prevent saving during initial load
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Load saved data when component mounts
    useEffect(() => {
        try {
            console.log('Attempting to load saved game data');
            const savedData = loadGameData();
            if (savedData) {
                console.log('Setting game state from saved data:', savedData);
                setGameState(savedData);
            } else {
                console.log('No saved data found, using default state');
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
            // If there's an error, clear potentially corrupted data
            clearGameData();
        } finally {
            // Mark initial load as complete
            setIsInitialLoad(false);
        }
    }, []);

    // Save data whenever state changes (but not during initial load)
    useEffect(() => {
        if (!isInitialLoad) {
            console.log('Game state changed, saving:', gameState);
            saveGameData(gameState);
        }
    }, [gameState, isInitialLoad]);

    // Game state functions with useCallback to maintain consistent function references
    const startGame = useCallback(() => {
        console.log('Starting game');
        setGameState(prevState => ({
            ...prevState,
            isGameStarted: true
        }));
    }, []);

    const updateLevel = useCallback((newLevel) => {
        console.log('Updating level to:', newLevel);
        setGameState(prevState => ({
            ...prevState,
            level: newLevel
        }));
    }, []);

    const setPlayerPseudo = useCallback((pseudo) => {
        console.log('Setting player pseudo to:', pseudo);
        setGameState(prevState => ({
            ...prevState,
            playerPseudo: pseudo
        }));
    }, []);

    const resetGame = useCallback(() => {
        console.log('Resetting game data');
        clearGameData();
        setGameState({
            level: 1,
            playerPseudo: '',
            playerHP: 20,
            actualLevel: 1,
            lastLevelPlayed: null,
            completedLevels: []
        });
    }, []);

    const contextValue = {
        gameState,
        startGame,
        updateLevel,
        setPlayerPseudo,
        resetGame
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};