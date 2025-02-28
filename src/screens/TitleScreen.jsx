// src/components/screens/TitleScreen.jsx
import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import PlayerForm from '../components/PlayerForm';
import MenuScreen from './MenuScreen'; // Assurez-vous que ce composant existe

const TitleScreen = () => {
    const { gameState } = useContext(GameContext);
    const [startGame, setStartGame] = useState(false);

    const handleStartGame = () => {
        setStartGame(true);
    };

    if (startGame) { 
        return <MenuScreen />;
    }

    return (
        <div className="screen-title" onClick={handleStartGame}>
            <div>
                <h1>Developper Battle</h1>
                {gameState.playerPseudo ? (
                    <div>
                        <p>Joueur : {gameState.playerPseudo} !</p>
                        <p>Niveau actuel : {gameState.level}</p>
                        <p class="info">
                            Appuyer pour continuer !
                        </p>
                    </div>
                ) : (
                    <PlayerForm />
                )}
            </div>
        </div>
    );
};

export default TitleScreen;