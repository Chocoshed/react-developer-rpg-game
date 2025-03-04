import enemy1 from '../assets/images/enemy1_animated.gif';
import enemy2 from '../assets/images/enemy2_animated.gif';
import enemy3 from '../assets/images/enemy3_animated.gif';
import enemy4 from '../assets/images/enemy4_animated.gif';
import enemy1_attack from '../assets/images/enemy1_attack.gif';
import enemy2_attack from '../assets/images/enemy2_attack.gif';
import enemy3_attack from '../assets/images/enemy3_attack.gif';


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
            name: "Voile de Grisaille",
            description: "Il recouvre le champ de bataille d'une couche grise, rendant l'environnement fade et sans relief."
        }
    },
    'stagnateur_immuable': {
        name: "Le stagnateur immuable",
        hp: 10,
        damage: 8,
        xp: 10,
        image: enemy3,
        imageAttack: enemy3_attack,
        description: "Refusant le changement, ce colosse immobile fige toute forme de progression, rendant le terrain de combat rigide et inerte.",
        weakness: 'js',
        normalAttack: {
            name: "Blocage Statique",
            description: "Le Stagnateur Immuable génère une onde de choc qui fige tout autour de lui dans une immobilité totale."
        }
    },
    'camoufleur_obscur': {
        name: "Le camoufleur obscur",
        hp: 20,
        damage: 3,
        xp: 20,
        image: enemy4,
        imageAttack: '',
        description: "Excentrique et insaisissable, le Camoufleur Obscur est capable de déclencher des tempêtes dans lesquelles les éléments semblent danser hors de leur place. Maître des illusions d’optique, il joue avec les règles de rendu, tordant les transformations et manipulant les pseudo-classes pour créer des effets d’ombre et de lumière qui désorientent et cachent les véritables contours de la scène.",
        weakness: 'css',
        normalAttack: {
            name: "Tempête de Camouflage",
            description: "Par un claquement de ses doigts, il applique des animations de keyframes qui altèrent la perception de saturation et contraste, plongeant ses adversaires dans une mer de formes spectrales et d’ombres malicieuses. En outre, il perturbe les flex properties des interfaces, provoquant un écroulement des alignements."
        }
    }
}

export { enemyData };