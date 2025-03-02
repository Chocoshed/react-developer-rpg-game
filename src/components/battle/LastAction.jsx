import React, { useEffect, useState } from 'react';

/**
 * Composant pour afficher la dernière action du combat
 * L'action s'affiche puis disparaît après un délai
 */
const LastAction = ({ message }) => {
    const [visible, setVisible] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        // Si un nouveau message arrive
        if (message && message !== currentMessage) {
            // Mettre à jour le message et afficher
            setCurrentMessage(message);
            setVisible(true);

            // Masquer après 3 secondes
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, currentMessage]);

    if (!visible || !currentMessage) {
        return null;
    }

    return (
        <div className="last-action-container">
            <div className="last-action">
                {currentMessage}
            </div>
        </div>
    );
};

export default LastAction;