import React from 'react';

/**
 * Composant pour afficher le journal de combat
 * Montre les actions récentes du combat
 */
const BattleLog = ({ logs = [] }) => {
    // Limiter le nombre de logs affichés (les plus récents)
    const displayLogs = logs.slice(-4);

    return (
        <div className="battle-log">
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