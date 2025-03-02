import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant conteneur pour les écrans du jeu
 * Fournit une structure cohérente pour tous les écrans
 */
const ScreenContainer = ({
    children,
    className = '',
    header = null,
    footer = null
}) => {
    const containerClass = `screen ${className}`.trim();

    return (
        <div className={containerClass}>
            {header && <div className="screen-header">{header}</div>}

            <div className="screen-content">
                {children}
            </div>

            {footer && <div className="screen-footer">{footer}</div>}
        </div>
    );
};

ScreenContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    header: PropTypes.node,
    footer: PropTypes.node
};

export default ScreenContainer;