// src/components/HealthBar.jsx
import React from 'react';

/**
 * Composant simple pour afficher une barre de vie
 * À développer ultérieurement pour le système de combat
 */
const HealthBar = ({ currentHP, maxHP }) => {
    // Calculer le pourcentage de santé
    const healthPercentage = Math.max(0, Math.min(100, (currentHP / maxHP) * 100));

    return (
        <div className="health-bar-container" style={{
            width: '100%',
            backgroundColor: '#333',
            height: '10px',
            border: '2px solid #000',
            marginTop: '5px',
            marginBottom: '5px'
        }}>
            <div className="health-bar" style={{
                width: `${healthPercentage}%`,
                backgroundColor: '#43b563',
                height: '100%'
            }} />
        </div>
    );
};

export default HealthBar;