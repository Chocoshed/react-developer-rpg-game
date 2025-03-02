import React from 'react';

/**
 * Composant pour afficher le journal de combat
 * Montre les actions du combat
 */
const BattleLog = ({ logs = [], maxDisplay = 0, className = '' }) => {
    // Si maxDisplay est défini et supérieur à 0, limiter le nombre d'entrées affichées
    const displayLogs = maxDisplay > 0 ? logs.slice(-maxDisplay) : logs;

    return (
        <div className={`battle-log ${className}`}>
            <h3>Journal de combat</h3>
            <div className="log-container">
                {displayLogs.length === 0 ? (
                    <p className="log-entry">Le combat commence...</p>
                ) : (
                    displayLogs.map((log, index) => (
                        <p key={index} className="log-entry">
                            {log}
                        </p>
                    ))
                )}
            </div>
        </div>
    );
};

export default BattleLog;