// Écrans du jeu
export const SCREENS = {
    TITLE: 'TITLE',
    MENU: 'MENU',
    LEVEL: 'LEVEL',
    BATTLE: 'BATTLE'
};

// Constantes liées au joueur
export const PLAYER = {
    INITIAL_HP: 20,
    INITIAL_LEVEL: 0,
    INITIAL_ENERGY: 0,
    MAX_ENERGY: 6,
    DEFAULT_IMAGE: '../assets/images/player_animated.gif',
    ATTACK_IMAGE: '../assets/images/player_attack.gif'
};

// Clé de stockage local
export const STORAGE_KEY = 'developer_battle_data';

// Types de développeurs (armes)
export const DEV_TYPES = {
    HTML: 'html',
    CSS: 'css',
    JS: 'javascript'
};

// État initial du jeu
export const INITIAL_GAME_STATE = {
    level: PLAYER.INITIAL_LEVEL,
    playerPseudo: '',
    playerHP: PLAYER.INITIAL_HP,
    playerEnergy: PLAYER.INITIAL_ENERGY,
    maxEnergy: PLAYER.MAX_ENERGY,
    lastLevelPlayed: null,
    completedLevels: [],
};