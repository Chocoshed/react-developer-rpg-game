import enemy1 from '../assets/images/enemy1_animated.gif';

const enemyData = {
    'desorganisateur_chaotique' : {
        name: "Le désorganisateur chaotique",
        hp: 10,
        damage: 2,
        xp: 10,
        image: enemy1,
        description: "Cet adversaire prospère dans le chaos, semant la confusion avec sa capacité à désorganiser toute structure.",
        weakness: 'html',
        normalAttack: {
            name: "Tempête de Désordre",
            damage: 3,
            description: "Il invoque une vague de désordre, dispersant les éléments de l’interface dans une confusion totale."
        }
    },
    'mime_grisonnant': {
        name: "Le mime grisonnant",
        hp: 10,
        damage: 2,
        xp: 10,
        image: enemy1,
        description: "Ce personnage terne aspire toute couleur et toute élégance, plongeant l'environnement dans une esthétique monotone et ennuyeuse.",
        weakness: 'css'
    },
    'stagnateur_immuable': {
        name: "Le stagnateur immuable",
        hp: 10,
        damage: 2,
        xp: 10,
        image: enemy1,
        description: "Refusant le changement, ce colosse immobile fige toute forme de progression, rendant le terrain de combat rigide et inerte.",
        weakness: 'js'
    },
}

export { enemyData };