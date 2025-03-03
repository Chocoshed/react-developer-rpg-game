import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer la logique de combat
 * 
 * @param {Object} playerData - Données du joueur
 * @param {Object} enemyData - Données de l'ennemi
 * @param {Object} devToolData - Données de l'outil de développement (arme du joueur)
 * @returns {Object} État et fonctions pour gérer le combat
 */
const useBattleLogic = (playerData, enemyData, devToolData) => {
    // État initial du combat
    const [battleState, setBattleState] = useState({
        playerHP: playerData.playerHP || 20,
        playerEnergy: playerData.playerEnergy || 0,
        enemyHP: enemyData.hp,
        lastAction: null,
        actions: ['Le combat commence!'], // Nouveau tableau pour stocker toutes les actions
        turn: 1,
        isEnded: false,
        winner: null
    });
    
    // Effet pour initialiser le combat avec les données du joueur et de l'ennemi
    useEffect(() => {
        setBattleState({
            playerHP: playerData.playerHP || 20,
            playerEnergy: playerData.playerEnergy || 0,
            maxEnergy: playerData.maxEnergy || 6,
            enemyHP: enemyData.hp,
            lastAction: null,
            actions: ['Le combat commence!'],
            turn: 1,
            isEnded: false,
            winner: null
        });
    }, [playerData.playerHP, playerData.playerEnergy, playerData.maxEnergy, enemyData.hp]);

    // Calculer les dégâts en fonction du type d'attaque
    const calculateDamage = (attackType) => {
        if (!devToolData) return 1; // Dégâts par défaut

        if (attackType === 'special' && devToolData.specialAttack) {
            return devToolData.specialAttack.damage;
        } else if (devToolData.normalAttack) {
            return devToolData.normalAttack.damage;
        }

        return 1; // Fallback
    };

    // Récupérer le nom de l'attaque
    const getAttackName = (attackType) => {
        if (!devToolData) return 'Attaque';

        if (attackType === 'special' && devToolData.specialAttack) {
            return devToolData.specialAttack.name;
        } else if (devToolData.normalAttack) {
            return devToolData.normalAttack.name;
        }

        return 'Attaque';
    };

    // Fonction pour gérer l'attaque du joueur
    // Dans la fonction playerAttack, ajoutez la logique pour gérer l'énergie:

    const playerAttack = (attackType) => {
        if (battleState.isEnded) return null;

        // Pour les attaques spéciales, vérifier que le joueur a assez d'énergie
        if (attackType === 'special' && devToolData && devToolData.specialAttack) {
            const requiredEnergy = devToolData.specialAttack.energyCost || 6;

            if (battleState.playerEnergy < requiredEnergy) {
                const notEnoughEnergyMessage = `Pas assez d'énergie! (${battleState.playerEnergy}/${requiredEnergy})`;

                setBattleState(prevState => ({
                    ...prevState,
                    lastAction: notEnoughEnergyMessage,
                    actions: [notEnoughEnergyMessage, ...prevState.actions]
                }));

                return null;
            }
        }

        // Calculer les dégâts
        const damage = calculateDamage(attackType);
        const newEnemyHP = Math.max(0, battleState.enemyHP - damage);

        // Mettre à jour l'énergie (ajouter pour les attaques normales, réinitialiser pour les spéciales)
        let newPlayerEnergy = battleState.playerEnergy;
        let energyMessage = '';

        if (attackType === 'normal' && devToolData && devToolData.normalAttack) {
            const energyGain = devToolData.normalAttack.charge || 1;
            newPlayerEnergy = Math.min(battleState.maxEnergy, battleState.playerEnergy + energyGain);
            energyMessage = ` (+${energyGain} énergie)`;
        } else if (attackType === 'special' && devToolData && devToolData.specialAttack) {
            const energyCost = devToolData.specialAttack.energyCost || 6;
            newPlayerEnergy = battleState.playerEnergy - energyCost;
            energyMessage = ` (-${energyCost} énergie)`;
        }

        // Message d'attaque
        const attackName = attackType === 'special'
            ? devToolData?.specialAttack?.name || 'Attaque spéciale'
            : devToolData?.normalAttack?.name || 'Attaque normale';

        const actionMessage = `${attackName} inflige ${damage} dégâts${energyMessage}`;

        // Vérifier si l'ennemi est vaincu
        const isEnemyDefeated = newEnemyHP <= 0;
        const newTurn = battleState.turn + 1;

        setBattleState(prevState => ({
            ...prevState,
            enemyHP: newEnemyHP,
            playerEnergy: newPlayerEnergy,
            lastAction: actionMessage,
            actions: [actionMessage, ...prevState.actions],
            turn: newTurn,
            isEnded: isEnemyDefeated,
            winner: isEnemyDefeated ? 'player' : null
        }));

        return { damage, type: attackType };
    };

    return {
        battleState,
        playerAttack
    };
};

export default useBattleLogic;