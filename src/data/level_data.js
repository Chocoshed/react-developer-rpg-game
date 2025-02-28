import { enemyData } from './enemy_data';
import { devToolsData } from './devTools_data';


const levelData = [
    {
        level: 1,
        isCompleted: false,
        enemyId: "desorganisateur_chaotique",
        enemyData: enemyData.desorganisateur_chaotique,
        devToolId: 'html',
        devToolData: devToolsData.html,
    },
    {
        level: 2,
        isCompleted: true,
        enemy: "Le grand méchant loup",
    },
    {
        level: 3,
        isCompleted: false,
        enemy: "Le dragon",
    },
    {
        level: 4,
        isCompleted: false,
        enemy: "Le boss final",
    }
]

export {levelData};