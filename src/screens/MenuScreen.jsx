import React, { useContext } from 'react';
import Level from '../components/level/Level';
import { GameContext } from '../contexts/GameContext';
import { clearGameData } from '../utils/localStorage';

const MenuScreen = ({ onSelectLevel }) => {
    const { gameState } = useContext(GameContext);
    const { resetGame } = useContext(GameContext);

    const clearStorage = () => {
        if (window.confirm('Êtes-vous sûr de vouloir effacer toutes les données de jeu ?')) {
            clearGameData();
            resetGame();
            alert('Données de jeu effacées. La page va se recharger.');
            window.location.reload();
        }
    };

    // Vérifier si le joueur a atteint le niveau 4
    const showThankYouMessage = gameState.level >= 4;

    return (
        <div className="screen">
            <div className="menu-header">
                <p>{gameState.playerPseudo}  - Nv : {gameState.level}</p>
                <button onClick={clearStorage} className="bg-white shadow-lg">
                    Réinitialiser
                </button>
            </div>
            <Level onSelectBattle={onSelectLevel} />

            {showThankYouMessage && (
                <div className="thank-you-message">
                    <p>Merci d'avoir joué à Developer Battle !</p>
                    <p>Vous avez terminé la version démo du jeu.</p>
                </div>
            )}
        </div>
    );
};

export default MenuScreen;