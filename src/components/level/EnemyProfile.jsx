import React, { useEffect, useState } from 'react';

const enemyProfile = ({ currentLevel }) => {
    const enemy = currentLevel.enemyData;

    // Fonction pour corriger le chemin de l'image
    const getImagePath = (imagePath) => {
        // Si le chemin commence déjà par 'src/', on ne modifie pas
        if (imagePath.startsWith('src/')) {
            return imagePath;
        }

        // Si le chemin commence par '/', on retire le premier caractère
        // car les assets importés doivent être relatifs dans Vite
        if (imagePath.startsWith('/')) {
            return imagePath.substring(1);
        }

        return imagePath;
    };
    return (
            <div className="pixel-corners-wrapper2">
                <div className='pixel-corners2'>
                    <div className='enemy-profil'>
                        <div className="pixel-corners-wrapper">
                            <div className="pixel-corners">
                                <div className="info">
                                    <h3>{enemy.name}</h3>
                                    <div className="image">
                                        <img
                                            src={getImagePath(enemy.image)}
                                            alt={enemy.name}
                                        />
                                    </div>
                                    {currentLevel.devToolId && (
                                    <p className="weakness"><span>Faiblesse </span>: {enemy.weakness}</p>)}
                                    <p className="description">{enemy.description}</p>
                                    <h3>Caractéristiques :</h3>
                                    <p><span>Attaque normale :</span> {enemy.normalAttack.name}</p>
                                    <p><span>Dégâts :</span> {enemy.damage}</p>
                                    <p>{enemy.normalAttack.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default enemyProfile;