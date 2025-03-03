import React from 'react';
import { GameProvider } from './contexts/GameContext';
import ScreenManager from './screens/ScreenManager';
import DebugButton from './components/DebugButton';
import './assets/styles/index.css';
import './assets/styles/battle.css';
import './assets/styles/intro.css';


const App = () => {
  return (
    <GameProvider>
      <div className="app">
        <ScreenManager />
        <DebugButton />
      </div>
    </GameProvider>
  );
};

export default App;