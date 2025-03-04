import { enemyData } from './enemy_data';
import { devToolsData } from './devTools_data';


const levelData = [
    {
        level: 1,
        enemyId: "desorganisateur_chaotique",
        enemyData: enemyData.desorganisateur_chaotique,
        devToolId: 'html',
        devToolData: devToolsData.html,
    },
    {
        level: 2,
        enemy: "Le mime grisonnant",
        enemyId: "mime_grisonnant",
        enemyData: enemyData.mime_grisonnant,
        devToolId: 'css',
        devToolData: devToolsData.css,
    },
    {
        level: 3,
        enemy: "Le stagnateur immuable",
        enemyId: "stagnateur_immuable",
        enemyData: enemyData.stagnateur_immuable,
        devToolId: 'javascript',
        devToolData: devToolsData.javascript,
    },
    {
        level: 4,
        enemy: "Le camoufleur obscur",
        enemyId: "camoufleur_obscur",
        enemyData: enemyData.camoufleur_obscur,
    },
    {
        level: 0,
    }
]

export {levelData};