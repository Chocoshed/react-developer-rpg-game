import React, { useEffect, useState } from 'react';

const DevTool = ({ currentLevel }) => {
    const devTool = currentLevel.devToolData;

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
                                    <h3>Votre arme :</h3>
                                    <h3>{devTool.name}</h3>
                                    {/* <img
                                        src={getImagePath(enemy.image)}
                                        alt={enemy.name}
                                    /> */}
                                    <p className="weakness"><span>Surnom </span>: {devTool.nickname}</p>
                                    <p className="description">{devTool.description}</p>
                                    
                                    <h3>Caractéristiques :</h3>
                                    <p><span>Attaque normale :</span> {devTool.normalAttack.name}</p>
                                    <p><span>Dégâts :</span> {devTool.normalAttack.damage}</p>
                                    <p>{devTool.normalAttack.description}</p>
                                    <p><span>Attaque spéciale :</span> {devTool.specialAttack.name}</p>
                                    <p><span>Dégâts :</span> {devTool.specialAttack.damage}</p>
                                    <p>{devTool.specialAttack.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default DevTool;