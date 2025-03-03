import React, { useState, useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

const PlayerForm = ({ onSubmitSuccess }) => {
    const { gameState, setPlayerPseudo } = useContext(GameContext);
    const [inputPseudo, setInputPseudo] = useState(gameState.playerPseudo || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        let pseudo = inputPseudo.trim();

        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
        if (specialCharacters.test(pseudo)) {
            alert('Le nom de développeur ne doit pas contenir de caractères spéciaux.');
            return;
        }

        if (pseudo.length > 15) {
            alert('Le nom de développeur doit contenir moins de 15 caractères.');
            return;
        }

        if (inputPseudo.trim()) {
            setPlayerPseudo(inputPseudo.trim());

            // Appeler le callback de succès pour passer à l'écran suivant
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } else {
            alert('Veuillez entrer un nom de développeur');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Entrez votre nom de développeur</h2>
                <p>(Maximum 15 caractères)</p>
                <p><span id="caracterTotal">{inputPseudo.length}</span> / 15</p>
                <input
                    type="text"
                    value={inputPseudo}
                    onChange={(e) => setInputPseudo(e.target.value)}
                    placeholder="Votre nom de développeur"
                />
                <button type="submit">
                    Commencer
                </button>
            </form>
        </div>
    );
};

export default PlayerForm;