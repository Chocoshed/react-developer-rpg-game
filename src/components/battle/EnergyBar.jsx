import React from 'react';

/**
 * Barre d'énergie pour le joueur
 * Affiche uniquement une barre visuelle sans texte
 */
const EnergyBar = ({ currentEnergy, maxEnergy }) => {
    // Calculer le pourcentage d'énergie
    const energyPercentage = Math.max(0, Math.min(100, (currentEnergy / maxEnergy) * 100));

    // Couleur bleue pour la barre d'énergie
    const barColor = '#3498db';

    return (
        <div className="energy-display">
            <div className="energy-bar-container" style={{
                width: '150px',
                backgroundColor: '#333',
                height: '10px',
                border: '2px solid #000',
                marginTop: '5px',
                marginBottom: '5px'
            }}>
                <div className="energy-bar" style={{
                    width: `${energyPercentage}%`,
                    backgroundColor: barColor,
                    height: '100%',
                    transition: 'width 0.3s ease-in-out'
                }} />
            </div>
        </div>
    );
};

export default EnergyBar;