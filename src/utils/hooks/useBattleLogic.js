import { useState, useEffect, useCallback } from 'react';

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
        maxEnergy: playerData.maxEnergy || 6,
        enemyHP: enemyData.hp,
        lastAction: null,
        actions: ['Le combat commence!'],
        turn: 1,
        isEnded: false,
        winner: null,
        playerCanAct: true,
        enemyAttacking: false
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
            winner: null,
            playerCanAct: true,
            enemyAttacking: false
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

    // Fonction pour l'attaque de l'ennemi
    const enemyAttack = useCallback(() => {
        // Si le combat est terminé, ne rien faire
        if (battleState.isEnded) return;

        // Set enemy attacking flag to true before attack
        setBattleState(prevState => ({
            ...prevState,
            enemyAttacking: true,
            playerCanAct: false // Make sure player can't act during animation
        }));
        // Wait for animation (short delay)
        setTimeout(() => {
            // Récupérer les dégâts de l'ennemi et son attaque
            const damage = enemyData.damage || 1;
            const attackName = enemyData.normalAttack?.name || "Attaque";

            // Calculer les nouveaux PV du joueur
            const newPlayerHP = Math.max(0, battleState.playerHP - damage);

            // Message d'attaque
            const actionMessage = `${enemyData.name} utilise ${attackName} et inflige ${damage} dégâts`;

            // Vérifier si le joueur est vaincu
            const isPlayerDefeated = newPlayerHP <= 0;
            // Finish attack and update battle state
            setBattleState(prevState => ({
                ...prevState,
                playerHP: newPlayerHP,
                lastAction: actionMessage,
                actions: [actionMessage, ...prevState.actions],
                isEnded: isPlayerDefeated,
                winner: isPlayerDefeated ? 'enemy' : null,
                playerCanAct: !isPlayerDefeated, // Le joueur peut agir après l'attaque si pas vaincu
                enemyAttacking: false // Reset animation flag
            }));
        }, 850 ); // Animation time for attack
    }, [battleState.isEnded, battleState.playerHP, enemyData]);


    // Fonction pour gérer l'attaque du joueur
    const playerAttack = (attackType) => {
        // Si le combat est terminé ou si le joueur ne peut pas agir, ne rien faire
        if (battleState.isEnded || !battleState.playerCanAct) return null;

        // Pour les attaques spéciales, vérifier que le joueur a assez d'énergie
        if (attackType === 'special' && devToolData && devToolData.specialAttack) {
            const requiredEnergy = Number(devToolData.specialAttack.energyCost) || battleState.maxEnergy || 6;

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

        // Mettre à jour l'énergie (ajouter pour les attaques normales, déduire pour les spéciales)
        let newPlayerEnergy = battleState.playerEnergy;
        let energyMessage = '';

        if (attackType === 'normal' && devToolData && devToolData.normalAttack) {
            const energyGain = Number(devToolData.normalAttack.charge) || 1;
            newPlayerEnergy = Math.min(battleState.maxEnergy, battleState.playerEnergy + energyGain);
            energyMessage = ` (+${energyGain} énergie)`;
        } else if (attackType === 'special' && devToolData && devToolData.specialAttack) {
            const energyCost = Number(devToolData.specialAttack.energyCost) || battleState.maxEnergy || 6;
            newPlayerEnergy = Math.max(0, battleState.playerEnergy - energyCost);
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
            winner: isEnemyDefeated ? 'player' : null,
            // Si l'ennemi n'est pas vaincu, le joueur ne peut pas agir jusqu'à la riposte de l'ennemi
            playerCanAct: isEnemyDefeated
        }));

        // Si l'ennemi n'est pas vaincu, déclencher sa riposte après un court délai
        if (!isEnemyDefeated) {
            setTimeout(() => {
                enemyAttack();
            }, 1000); // Délai d'1 seconde avant la riposte de l'ennemi
        }

        return { damage, type: attackType };
    };

    return {
        battleState,
        playerAttack
    };
};

export default useBattleLogic;