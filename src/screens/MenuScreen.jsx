import React, { useContext } from 'react';
import Level from '../components/level/Level';
import { GameContext } from '../contexts/GameContext';

const MenuScreen = ({ onSelectLevel }) => {
    const { gameState } = useContext(GameContext);

    return (
        <div className="screen">
            <div className="menu-header">
                <p>{gameState.playerPseudo}</p>
            </div>
            <Level onSelectBattle={onSelectLevel} />
        </div>
    );
};

export default MenuScreen;