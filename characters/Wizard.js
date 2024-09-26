import Character from './Character.js';

class Wizard extends Character {
    constructor(name = 'Merlin') {
        super(name, 10, 200, 2);
    }

    special(target) {
        if (this.mana >= 25 && this.canAct()) {
            this.log(`${this.name} utilise Fireball sur ${target.name} et inflige 7 dégâts.`);
            target.takeDamage(7);
            this.mana -= 25;
        } else if (this.canAct()) {
            this.log(`${this.name} n'a pas assez de mana pour utiliser Fireball, il attaque.`);
            this.dealDamage(target);
        } else {
            this.log(`${this.name} est éliminé et ne peut pas agir.`);
        }
    }
}

export default Wizard;