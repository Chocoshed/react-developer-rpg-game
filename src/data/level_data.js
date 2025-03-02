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
        isCompleted: false,
        enemy: "Le grand méchant loup",
        enemyId: "desorganisateur_chaotique",
        enemyData: enemyData.desorganisateur_chaotique,
        devToolId: 'html',
        devToolData: devToolsData.html,
    },
    {
        level: 3,
        isCompleted: false,
        enemy: "Le dragon",
        enemyId: "desorganisateur_chaotique",
        enemyData: enemyData.desorganisateur_chaotique,
        devToolId: 'html',
        devToolData: devToolsData.html,
    },
    {
        level: 4,
        isCompleted: false,
        enemy: "Le boss final",
    }
]

export {levelData};