import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import PlayerForm from '../components/player/PlayerForm';

const TitleScreen = ({ onStart, onContinue }) => {
    const { gameState } = useContext(GameContext);

    const handleStartGame = () => {
        if (gameState.playerPseudo) {
            // If player already has a name, go directly to menu
            onContinue();
        }
    };

    return (
        <div className="screen-title" onClick={gameState.playerPseudo ? handleStartGame : null}>
            <div>
                <h1>Developer Battle</h1>
                {gameState.playerPseudo ? (
                    <div>
                        <p>Joueur : {gameState.playerPseudo} !</p>
                        <p>Niveau actuel : {gameState.level}</p>
                        <p className="info">
                            Appuyer pour continuer !
                        </p>
                    </div>
                ) : (
                    <PlayerForm onSubmitSuccess={onStart} />
                )}
            </div>
        </div>
    );
};

export default TitleScreen;