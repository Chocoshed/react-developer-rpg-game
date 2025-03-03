import React from 'react';

/**
 * Barre de vie pour les combattants
 * Affiche une barre visuelle et les valeurs numériques des PV
 */
const HealthBar = ({ currentHP, maxHP, name, isEnemy = false }) => {
    // Calculer le pourcentage de santé
    const healthPercentage = Math.max(0, Math.min(100, (currentHP / maxHP) * 100));

    // Déterminer la couleur de la barre de vie en fonction du pourcentage
    let barColor = '#43b563'; // Vert par défaut

    if (healthPercentage < 25) {
        barColor = '#e74c3c'; // Rouge pour santé critique
    } else if (healthPercentage < 50) {
        barColor = '#f39c12'; // Orange pour santé basse
    }

    return (
        <div className="health-display">
            <div className="health-info">
                <span className="health-value">{currentHP} / {maxHP} PV</span>
            </div>

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
                    backgroundColor: barColor,
                    height: '100%',
                    transition: 'width 0.3s ease-in-out'
                }} />
            </div>
        </div>
    );
};

export default HealthBar;