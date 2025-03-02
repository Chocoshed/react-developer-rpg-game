
/**
 * Classe qui gère la logique de combat
 * Permet de séparer la logique métier de l'interface utilisateur
 */
class BattleModel {
    constructor(playerData, enemyData) {
        this.player = {
            ...playerData,
            currentHP: playerData.hp || playerData.playerHP
        };

        this.enemy = {
            ...enemyData,
            currentHP: enemyData.hp
        };

        this.turn = 1;
        this.logs = ['Combat initié!'];
        this.isEnded = false;
        this.winner = null;
    }

    /**
     * Effectue une attaque du joueur contre l'ennemi
     * @param {string} attackType - Type d'attaque ('normal' ou 'special')
     * @returns {Object} Le résultat de l'attaque
     */
    playerAttack(attackType = 'normal') {
        if (this.isEnded) return { success: false, message: 'Le combat est terminé' };

        const playerTool = this.player.tool || {};
        const attack = attackType === 'special' ? playerTool.specialAttack : playerTool.normalAttack;

        if (!attack) {
            return { success: false, message: "Type d'attaque non disponible" };
        }

        const damage = attack.damage;
        this.enemy.currentHP = Math.max(0, this.enemy.currentHP - damage);

        const logMessage = `${this.player.playerPseudo} utilise ${attack.name} et inflige ${damage} points de dégâts!`;
        this.logs.push(logMessage);

        // Vérifier si l'ennemi est vaincu
        if (this.enemy.currentHP <= 0) {
            this.isEnded = true;
            this.winner = 'player';
            this.logs.push(`${this.enemy.name} a été vaincu!`);
        } else {
            // Incrémenter le tour
            this.turn++;
        }

        return {
            success: true,
            damage,
            message: logMessage,
            isEnded: this.isEnded,
            winner: this.winner
        };
    }

    /**
     * Effectue une attaque de l'ennemi contre le joueur
     * @returns {Object} Le résultat de l'attaque
     */
    enemyAttack() {
        if (this.isEnded) return { success: false, message: 'Le combat est terminé' };

        const damage = this.enemy.damage;
        this.player.currentHP = Math.max(0, this.player.currentHP - damage);

        const logMessage = `${this.enemy.name} attaque et inflige ${damage} points de dégâts!`;
        this.logs.push(logMessage);

        // Vérifier si le joueur est vaincu
        if (this.player.currentHP <= 0) {
            this.isEnded = true;
            this.winner = 'enemy';
            this.logs.push(`${this.player.playerPseudo} a été vaincu!`);
        } else {
            // Incrémenter le tour
            this.turn++;
        }

        return {
            success: true,
            damage,
            message: logMessage,
            isEnded: this.isEnded,
            winner: this.winner
        };
    }

    /**
     * Récupère l'état actuel du combat
     * @returns {Object} État actuel du combat
     */
    getBattleState() {
        return {
            player: this.player,
            enemy: this.enemy,
            turn: this.turn,
            logs: this.logs,
            isEnded: this.isEnded,
            winner: this.winner
        };
    }

    /**
     * Calcule les récompenses de fin de combat
     * @returns {Object} Récompenses (XP, etc.)
     */
    getRewards() {
        if (!this.isEnded || this.winner !== 'player') {
            return { xp: 0 };
        }

        return {
            xp: this.enemy.xp || 0
        };
    }
}

export default BattleModel;