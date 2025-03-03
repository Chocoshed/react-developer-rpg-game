import enemy1 from '../assets/images/enemy1_animated.gif';
import enemy2 from '../assets/images/enemy2_animated.gif';
import enemy1_attack from '../assets/images/enemy1_attack.gif';
import enemy2_attack from '../assets/images/enemy2_attack.gif';

const enemyData = {
    'desorganisateur_chaotique' : {
        name: "Le désorganisateur chaotique",
        hp: 10,
        damage: 8,
        xp: 10,
        image: enemy1,
        imageAttack: enemy1_attack,
        description: "Cet adversaire prospère dans le chaos, semant la confusion avec sa capacité à désorganiser toute structure.",
        weakness: 'html',
        normalAttack: {
            name: "Tempête de Désordre",
            description: "Il invoque une vague de désordre, dispersant les éléments de l’interface dans une confusion totale."
        }
    },
    'mime_grisonnant': {
        name: "Le mime grisonnant",
        hp: 10,
        damage: 8,
        xp: 10,
        image: enemy2,
        imageAttack: enemy2_attack,
        description: "Ce personnage terne aspire toute couleur et toute élégance, plongeant l'environnement dans une esthétique monotone et ennuyeuse.",
        weakness: 'css',
        normalAttack: {
            name: "Tempête de Désordre",
            description: "Il invoque une vague de désordre, dispersant les éléments de l’interface dans une confusion totale."
        }
    },
    'stagnateur_immuable': {
        name: "Le stagnateur immuable",
        hp: 10,
        damage: 8,
        xp: 10,
        image: enemy1,
        imageAttack: enemy1_attack,
        description: "Refusant le changement, ce colosse immobile fige toute forme de progression, rendant le terrain de combat rigide et inerte.",
        weakness: 'js',
        normalAttack: {
            name: "Tempête de Désordre",
            description: "Il invoque une vague de désordre, dispersant les éléments de l’interface dans une confusion totale."
        }
    },
}

export { enemyData };