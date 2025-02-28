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
    },
    'mime_grisonnant': {
        name: "Le mime grisonnant",
        hp: 20,
        damage: 4,
        xp: 20,
        image: enemy1,
        description: "Ce personnage terne aspire toute couleur et toute élégance, plongeant l'environnement dans une esthétique monotone et ennuyeuse.",
        weakness: 'css'
    }
}

export { enemyData };