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
            enemyHP: enemyData.hp,
            lastAction: null,
            actions: ['Le combat commence!'],
            turn: 1,
            isEnded: false,
            winner: null
        });
    }, [playerData.playerHP, enemyData.hp]);

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
    const playerAttack = (attackType = 'normal') => {
        // Si le combat est terminé, on ne fait rien
        if (battleState.isEnded) return;

        const damage = calculateDamage(attackType);
        const attackName = getAttackName(attackType);
        const newEnemyHP = Math.max(0, battleState.enemyHP - damage);

        // Vérifier si l'ennemi est vaincu
        const enemyDefeated = newEnemyHP <= 0;

        // Créer le message pour cette action
        const actionMessage = `${playerData.playerPseudo} utilise ${attackName} et inflige ${damage} points de dégâts!`;

        // Créer un tableau mis à jour avec toutes les actions
        const updatedActions = [...battleState.actions, actionMessage];

        // Ajouter un message de victoire si l'ennemi est vaincu
        if (enemyDefeated) {
            updatedActions.push(`${enemyData.name} a été vaincu!`);
        }

        // Mettre à jour l'état
        setBattleState({
            ...battleState,
            enemyHP: newEnemyHP,
            lastAction: actionMessage,
            actions: updatedActions,
            turn: battleState.turn + 1,
            isEnded: enemyDefeated,
            winner: enemyDefeated ? 'player' : null
        });

        return {
            damage,
            isEnemyDefeated: enemyDefeated
        };
    };

    return {
        battleState,
        playerAttack
    };
};

export default useBattleLogic;