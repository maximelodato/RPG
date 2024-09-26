import Character from './Character.js';

class Fighter extends Character {
    constructor(name = 'Grace') {
        super(name, 12, 40, 4);
    }

    special(target) {
        if (this.mana >= 20 && this.canAct()) {
            this.log(`${this.name} utilise Dark Vision sur ${target.name} et inflige 5 dégâts.`);
            target.takeDamage(5);
            this.mana -= 20;
            this.log(`${this.name} recevra 2 dégâts en moins au prochain tour.`);
        } else if (this.canAct()) {
            this.log(`${this.name} n'a pas assez de mana pour utiliser Dark Vision, il attaque.`);
            this.dealDamage(target);
        } else {
            this.log(`${this.name} est éliminé et ne peut pas agir.`);
        }
    }
}

export default Fighter;
