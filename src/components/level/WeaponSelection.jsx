import React, { useState } from 'react';
import { devToolsData } from '../../data/devTools_data';

const WeaponSelection = ({ onSelectWeapon }) => {
    // État pour suivre l'arme sélectionnée
    const [selectedWeaponId, setSelectedWeaponId] = useState(null);

    // Récupérer les outils disponibles
    const availableWeapons = Object.entries(devToolsData);

    // Gérer la sélection d'une arme
    const handleWeaponSelect = (weaponId, weaponData) => {
        setSelectedWeaponId(weaponId);
        onSelectWeapon(weaponId, weaponData);
    };

    return (
        <div className="pixel-corners-wrapper2">
            <div className='pixel-corners2'>
                <div className='enemy-profil'>
                    <div className="pixel-corners-wrapper">
                        <div className="pixel-corners">
                            <div className="info">
                                <h3>Choisissez votre arme</h3>
                                <p>Pour ce combat, vous devez choisir l'arme la plus adaptée.</p>
                                <p>Chaque ennemi a une faiblesse particulière - choisissez avec sagesse !</p>

                                <div className="weapons-list">
                                    {availableWeapons.map(([weaponId, weapon]) => (
                                        <div
                                            key={weaponId}
                                            className={`weapon-option ${selectedWeaponId === weaponId ? 'selected' : ''}`}
                                            onClick={() => handleWeaponSelect(weaponId, weapon)}
                                        >
                                            <h4>{weapon.name}</h4>
                                            <p className="weapon-nickname">{weapon.nickname}</p>
                                            <div className="weapon-details">
                                                <p><span>Attaque normale:</span> {weapon.normalAttack.name}</p>
                                                <p><span>Dégâts:</span> {weapon.normalAttack.damage}</p>
                                                <p><span>Attaque spéciale:</span> {weapon.specialAttack.name}</p>
                                                <p><span>Dégâts:</span> {weapon.specialAttack.damage}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeaponSelection;