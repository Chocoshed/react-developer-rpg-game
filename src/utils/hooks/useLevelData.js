import { useState, useEffect } from 'react';
import { levelData } from '../data/level_data';

/**
 * Hook personnalisé pour charger et gérer les données d'un niveau
 * @param {number} levelIndex - Index du niveau à charger
 * @returns {Object} Données et fonctions liées au niveau
 */
const useLevelData = (levelIndex) => {
    const [currentLevel, setCurrentLevel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Réinitialiser l'état au changement d'index
        setIsLoading(true);
        setError(null);

        try {
            // Charger les données du niveau sélectionné
            if (levelIndex !== null && levelData[levelIndex]) {
                setCurrentLevel(levelData[levelIndex]);
            } else if (levelIndex !== null) {
                setError(`Niveau ${levelIndex} non trouvé`);
            }
        } catch (err) {
            setError(`Erreur lors du chargement du niveau: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [levelIndex]);

    // Vérifier si le niveau est complété
    const isLevelCompleted = (completedLevels) => {
        if (!currentLevel) return false;
        return completedLevels.includes(currentLevel.level);
    };

    // Récupérer les détails de l'outil du développeur pour ce niveau
    const getDevTool = () => currentLevel?.devToolData || null;

    // Récupérer les détails de l'ennemi pour ce niveau
    const getEnemy = () => currentLevel?.enemyData || null;

    return {
        currentLevel,
        isLoading,
        error,
        isLevelCompleted,
        getDevTool,
        getEnemy
    };
};

export default useLevelData;