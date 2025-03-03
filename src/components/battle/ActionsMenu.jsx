import React from 'react';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

const ActionsMenu = ({ onAttack, onFlee, devTool, currentEnergy, playerCanAct = true }) => {
    const { gameState } = useContext(GameContext);

    // Get the current energy or use a default if not available
    const energy = currentEnergy !== undefined ? currentEnergy : 0;
    const maxEnergy = gameState.maxEnergy;

    // Special attack energy cost
    const specialAttackCost = devTool?.specialAttack?.energyCost || maxEnergy;
    const canUseSpecialAttack = energy >= specialAttackCost && playerCanAct;

    return (
        <div className="actions-menu">
            <button
                onClick={() => playerCanAct && onAttack('normal')}
                className={`action-button attack-button ${!playerCanAct ? 'disabled' : ''}`}
                disabled={!playerCanAct}
            >
                {devTool?.normalAttack?.name || "Attaque normale"}
            </button>

            <button
                onClick={() => canUseSpecialAttack && onAttack('special')}
                className={`action-button special-attack-button ${!canUseSpecialAttack ? 'disabled' : ''}`}
                disabled={!canUseSpecialAttack}
            >
                {devTool?.specialAttack?.name || "Attaque spéciale"}
            </button>

            <button
                onClick={() => playerCanAct && onFlee()}
                className={`action-button flee-button ${!playerCanAct ? 'disabled' : ''}`}
                disabled={!playerCanAct}
            >
                Fuir
            </button>
        </div>
    );
};

export default ActionsMenu;