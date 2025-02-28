// src/utils/localStorage.js

const GAME_DATA_KEY = 'developer_battle_data';

/**
 * Saves game data to local storage
 * @param {Object} gameData - The game data to save
 */
export const saveGameData = (gameData) => {
    try {
        // Add debugging
        console.log('Saving game data:', gameData);

        const serializedData = JSON.stringify(gameData);
        localStorage.setItem(GAME_DATA_KEY, serializedData);

        // Verify data was saved correctly
        const savedData = localStorage.getItem(GAME_DATA_KEY);
        console.log('Verification - Data in localStorage:', savedData);

        console.log('Game data saved successfully');
    } catch (error) {
        console.error('Failed to save game data:', error);
    }
};

/**
 * Loads game data from local storage
 * @returns {Object|null} The loaded game data or null if no data exists
 */
export const loadGameData = () => {
    try {
        const serializedData = localStorage.getItem(GAME_DATA_KEY);
        console.log('Loading data from localStorage:', serializedData);

        if (!serializedData) {
            console.log('No saved game data found');
            return null;
        }

        const parsedData = JSON.parse(serializedData);
        console.log('Parsed game data:', parsedData);
        return parsedData;
    } catch (error) {
        console.error('Failed to load game data:', error);
        // Clear potentially corrupted data
        localStorage.removeItem(GAME_DATA_KEY);
        return null;
    }
};

/**
 * Clears game data from local storage
 */
export const clearGameData = () => {
    try {
        localStorage.removeItem(GAME_DATA_KEY);
        console.log('Game data cleared');
    } catch (error) {
        console.error('Failed to clear game data:', error);
    }
};