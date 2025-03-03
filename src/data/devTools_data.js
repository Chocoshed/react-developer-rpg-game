const devToolsData = {
    'html': {
        name: "HTML",
        nickname: 'le pilier structurant',
        description: "HyperText Markup Language, HTML est le socle sur lequel repose tout site web. C'est l’architecte de l’interface, organisant les fondations et définissant la structure du monde numérique. Sans lui, rien n’existerait !",
        image: '',
        normalAttack: {
            name: "Balise Écrasante",
            damage: 3,
            charge: 3,
            description: "HTML envoie une pluie de balises <div> et <p> pour poser une base solide et enfermer l’enemy dans un cadre bien défini."
        },
        specialAttack: {
            name: "Hyper Lien Dimensionnel",
            damage: 5,
            energyCost: 6,
            description: "Utilisant la puissance des liens <a>, HTML ouvre des portails vers d'autres dimensions, téléportant ses alliés à travers le web pour surprendre l’enemy."
        }
    },
    'css': {
        name: "CSS",
        nickname: 'Le Tisseur d’Élégance',
        description: "CSS est l’artiste de l’équipe. Il apporte couleurs, animations et harmonie. Grâce à lui, le monde du web devient un spectacle visuel époustouflant, digne des plus grands chefs-d'œuvre.",
        image: '',
        normalAttack: {
            name: "Cascade Chromatique",
            damage: 3,
            charge: 3,
            description: "CSS projette une vague de couleurs et de dégradés qui aveugle temporairement l’ennemi, réduisant sa précision."
        },
        specialAttack: {
            name: "Métamorphose Responsive",
            damage: 5,
            energyCost: 6,
            description: "CSS s’adapte à toutes les tailles d’écran en un instant, rendant l’équipe insaisissable en modifiant sa forme et sa disposition."
        }
    },
    "javascript": {
        name: "JavaScript",
        nickname: 'Le Maître de l’Interaction',
        description: "JavaScript est le stratège de l’équipe. Agile et rapide, il rend chaque action imprévisible et anime le terrain de bataille. Grâce à lui, rien n’est figé et tout peut évoluer en temps réel !",
        image: '',
        normalAttack: {
            name: "Boucle Infinie",
            damage: 3,
            charge: 3,
            description: "JavaScript piège l’ennemi dans une boucle while(true), l’empêchant d’agir pendant un tour."
        },
        specialAttack: {
            name: "DOMination Totale",
            damage: 5,
            energyCost : 6,
            description: "JavaScript prend le contrôle du DOM et réorganise l’environnement du combat en temps réel, surprenant l’ennemi avec de nouveaux obstacles et pièges."
        }
    }
}

export {devToolsData};