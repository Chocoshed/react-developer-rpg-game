// src/App.jsx
import React from 'react';
import { GameProvider } from './contexts/GameContext';
import TitleScreen from './screens/TitleScreen';
import DebugButton from './components/DebugButton';
import './assets/styles/index.css';

// Composant principal simplifié qui ne dépend plus de isGameStarted
const App = () => {
  return (
    <GameProvider>
      <div className="app">
        <TitleScreen />
        <DebugButton />
      </div>
    </GameProvider>
  );
};

export default App;