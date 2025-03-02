import React, { useState } from 'react';
import Button from '../common/Button';

/**
 * Menu d'actions pour l'écran de combat
 * Affiche les actions disponibles (attaques et fuite)
 */
const ActionsMenu = ({ onAttack, onFlee, devTool }) => {
    // État pour le survol des attaques (pour afficher la description)
    const [hoveredAttack, setHoveredAttack] = useState(null);

    // Vérifier si devTool existe et contient les données d'attaque
    const hasNormalAttack = devTool && devTool.normalAttack;
    const hasSpecialAttack = devTool && devTool.specialAttack;

    return (
        <div className="actions-menu">
            <h3>Actions</h3>

            <div className="actions-container">
                {hasNormalAttack && (
                    <Button
                        onClick={() => onAttack('normal')}
                        className="action-button attack-button"
                        onMouseEnter={() => setHoveredAttack(devTool.normalAttack)}
                        onMouseLeave={() => setHoveredAttack(null)}
                    >
                        {devTool.normalAttack.name} ({devTool.normalAttack.damage})
                    </Button>
                )}

                {hasSpecialAttack && (
                    <Button
                        onClick={() => onAttack('special')}
                        className="action-button special-button"
                        onMouseEnter={() => setHoveredAttack(devTool.specialAttack)}
                        onMouseLeave={() => setHoveredAttack(null)}
                    >
                        {devTool.specialAttack.name} ({devTool.specialAttack.damage})
                    </Button>
                )}

                <Button
                    onClick={onFlee}
                    className="action-button flee-button"
                >
                    Fuir
                </Button>
            </div>
        </div>
    );
};

export default ActionsMenu;