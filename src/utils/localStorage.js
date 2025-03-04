import { STORAGE_KEY } from './constants';

/**
 * Saves game data to local storage
 * @param {Object} gameData - The game data to save
 * @returns {boolean} Success status
 */
export const saveGameData = (gameData) => {
    try {
        // Add debugging
        // console.log('Saving game data:', gameData);

        const serializedData = JSON.stringify(gameData);
        localStorage.setItem(STORAGE_KEY, serializedData);

        // Verify data was saved correctly
        const savedData = localStorage.getItem(STORAGE_KEY);
        // console.log('Verification - Data in localStorage:', savedData);

        // console.log('Game data saved successfully');
        return true;
    } catch (error) {
        console.error('Failed to save game data:', error);
        return false;
    }
};

/**
 * Loads game data from local storage
 * @returns {Object|null} The loaded game data or null if no data exists
 */
export const loadGameData = () => {
    try {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        // console.log('Loading data from localStorage:', serializedData);

        if (!serializedData) {
            // console.log('No saved game data found');
            return null;
        }

        const parsedData = JSON.parse(serializedData);
        // console.log('Parsed game data:', parsedData);
        return parsedData;
    } catch (error) {
        console.error('Failed to load game data:', error);
        // Clear potentially corrupted data
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};

/**
 * Clears game data from local storage
 * @returns {boolean} Success status
 */
export const clearGameData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        // console.log('Game data cleared');
        return true;
    } catch (error) {
        console.error('Failed to clear game data:', error);
        return false;
    }
};

/**
 * Checks if game data exists in local storage
 * @returns {boolean} True if game data exists
 */
export const hasGameData = () => {
    return localStorage.getItem(STORAGE_KEY) !== null;
};