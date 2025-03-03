import React from 'react';
import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const IntroScreen = ({onContinue}) => {
    const { gameState } = useContext(GameContext);
    const playerName = gameState.playerPseudo || 'Développeur';

    return (
        <div class="screen-intro">
            <p>Bienvenue, <span class="player-name">{playerName}</span> !</p>

            <p>
                Dans un monde où le développement web façonne chaque recoin de la réalité, une menace invisible sème le désordre au cœur des systèmes. À travers les pixels et le code, une quête épique vous attend pour rétablir l'harmonie et devenir le plus grand développeur web de votre génération.
            </p>

            <p>
                Vous devrez dompter chaque langage, affronter des ennemis redoutables, et dévoiler les mystères cachés au sein de ces lignes de code. HTML, CSS, JavaScript et plein d'autres ! Chaque technologie sera une arme précieuse dans votre arsenal.
            </p>

            <p> Votre mission : Restaurer l'équilibre numérique.</p>

            <p>L'avenir du web repose entre vos mains.</p>
            <button onClick={onContinue} className="action-button">
                Commencer l'aventure
            </button>
        </div>
    );
};

export default IntroScreen;