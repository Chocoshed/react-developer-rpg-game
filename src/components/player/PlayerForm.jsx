import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../contexts/GameContext';

const PlayerForm = ({ onSubmitSuccess }) => {
    const { gameState, setPlayerPseudo } = useContext(GameContext);
    const [inputPseudo, setInputPseudo] = useState(gameState.playerPseudo || '');
    const [isFocused, setIsFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    // Réinitialiser l'erreur lorsque l'utilisateur commence à taper
    useEffect(() => {
        if (inputPseudo && errorMessage) {
            setErrorMessage('');
            setShowError(false);
        }
    }, [inputPseudo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let pseudo = inputPseudo.trim();

        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
        if (specialCharacters.test(pseudo)) {
            setErrorMessage('Le nom ne doit pas contenir de caractères spéciaux.');
            setShowError(true);
            return;
        }

        if (pseudo.length > 15) {
            setErrorMessage('Le nom doit contenir moins de 15 caractères.');
            setShowError(true);
            return;
        }

        if (inputPseudo.trim()) {
            setPlayerPseudo(inputPseudo.trim());

            // Appeler le callback de succès pour passer à l'écran suivant
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } else {
            setErrorMessage('Veuillez entrer un nom de développeur');
            setShowError(true);
        }
    };

    return (
        <div className="player-form-container">
            <div className="player-form-wrapper">
                <form onSubmit={handleSubmit} className="player-form">
                    <div className="form-instruction">
                        <p>&gt; ENTREZ VOTRE NOM DE DEV</p>
                    </div>

                    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
                        <span className="input-prompt">&gt;</span>
                        <input
                            type="text"
                            value={inputPseudo}
                            onChange={(e) => setInputPseudo(e.target.value)}
                            placeholder="VOTRE NOM"
                            maxLength="15"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="pixel-input"
                            autoFocus
                        />
                        <span className={`input-cursor ${isFocused ? 'blink' : ''}`}>_</span>
                    </div>

                    <div className="char-counter">
                        <span className={inputPseudo.length > 10 ? 'warning' : ''}>
                            {inputPseudo.length}
                        </span> / 15
                    </div>

                    {showError && (
                        <div className="error-message">
                            ! {errorMessage}
                        </div>
                    )}

                    <button type="submit" className="pixel-button">
                        COMMENCER L'AVENTURE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PlayerForm;