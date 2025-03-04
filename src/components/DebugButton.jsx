import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { loadGameData, clearGameData } from '../utils/localStorage';

const DebugButton = () => {
    const { resetGame } = useContext(GameContext);

    const checkLocalStorage = () => {
        const data = loadGameData();
        // console.log('Current localStorage data:', data);
        alert(JSON.stringify(data, null, 2));
    };

    const clearStorage = () => {
        if (window.confirm('Are you sure you want to clear all game data?')) {
            clearGameData();
            resetGame();
            alert('Game data cleared. Page will reload.');
            window.location.reload();
        }
    };
    

    return (
        <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
            <button onClick={checkLocalStorage} className="bg-white shadow-lg">
                Check Storage
            </button>
            <button onClick={clearStorage} className="bg-white shadow-lg">
                Clear Storage
            </button>
        </div>
    );
};

export default DebugButton;