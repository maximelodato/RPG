import Character from './Character.js';

class Monk extends Character {
    constructor(name = 'Moana') {
        super(name, 8, 200, 2);
    }

    special(target) {
        if (this.mana >= 25 && this.canAct()) {
            this.hp += 8; 
            this.mana -= 25;
            this.log(`${this.name} se soigne de 8 PV. Il lui reste ${this.hp} PV.`);
        } else if (this.canAct()) {
            this.log(`${this.name} n'a pas assez de mana pour se soigner, il attaque.`);
            this.dealDamage(target);
        } else {
            this.log(`${this.name} est éliminé et ne peut pas agir.`);
        }
    }
}

export default Monk;
