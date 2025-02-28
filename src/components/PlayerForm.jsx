// src/components/PlayerForm.jsx
import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const PlayerForm = () => {
    const { gameState, setPlayerPseudo } = useContext(GameContext);
    const [inputPseudo, setInputPseudo] = useState(gameState.playerPseudo || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputPseudo.trim()) {
            console.log('Setting player pseudo to:', inputPseudo.trim());
            setPlayerPseudo(inputPseudo.trim());

        } else {
            alert('Veuillez entrer un nom de développeur');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Entrez votre nom de développeur</h2>
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