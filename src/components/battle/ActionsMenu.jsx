import React from 'react';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

const ActionsMenu = ({ onAttack, onFlee, devTool, currentEnergy }) => {
    const { gameState } = useContext(GameContext);

    // Get the current energy or use a default if not available
    const energy = currentEnergy !== undefined ? currentEnergy : 0;
    const maxEnergy = gameState.maxEnergy;

    // Special attack energy cost
    const specialAttackCost = devTool?.specialAttack?.energyCost || maxEnergy;
    const canUseSpecialAttack = energy >= specialAttackCost;

    return (
        <div className="actions-menu">
            <button
                onClick={() => onAttack('normal')}
                className="action-button attack-button"
            >
                {devTool?.normalAttack?.name || "Attaque normale"}
                {/* {devTool?.normalAttack?.charge && (
                    <span className="energy-indicator">+{devTool.normalAttack.charge}</span>
                )} */}
            </button>

            <button
                onClick={() => onAttack('special')}
                className={`action-button special-attack-button ${!canUseSpecialAttack ? 'disabled' : ''}`}
                disabled={!canUseSpecialAttack}
            >
                {devTool?.specialAttack?.name || "Attaque spéciale"}
                {/* <span className="energy-indicator">-{specialAttackCost}</span> */}
            </button>

            <button
                onClick={onFlee}
                className="action-button flee-button"
            >
                Fuir
            </button>
        </div>
    );
};

export default ActionsMenu;