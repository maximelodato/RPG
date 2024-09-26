import Character from './Character.js';

class Assassin extends Character {
    constructor(name = 'Carl') {
        super(name, 6, 20, 6);
    }

    special(target) {
        if (this.mana >= 20 && this.canAct()) {
            this.log(`${this.name} utilise Shadow Hit sur ${target.name}.`);
            target.takeDamage(7);
            this.mana -= 20;
            this.log(`${this.name} ne prendra pas de dégâts au prochain tour.`);
        } else if (this.canAct()) {
            this.log("Pas assez de mana. Utilisation de l'attaque de base.");
            this.dealDamage(target);
        } else {
            this.log(`${this.name} est éliminé et ne peut pas agir.`);
        }
    }
}

export default Assassin;
