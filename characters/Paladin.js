import Character from './Character.js';

class Paladin extends Character {
    constructor(name = 'Ulder') {
        super(name, 16, 160, 3);
    }

    special(target) {
        if (this.mana >= 40 && this.canAct()) {
            this.log(`${this.name} utilise Healing Lightning sur ${target.name} et inflige 4 dégâts.`);
            target.takeDamage(4);
            this.hp += 5;
            this.log(`${this.name} se soigne de 5 PV. Il lui reste ${this.hp} PV.`);
        } else if (this.canAct()) {
            this.log(`${this.name} n'a pas assez de mana pour utiliser Healing Lightning, il attaque.`);
            this.dealDamage(target);
        } else {
            this.log(`${this.name} est éliminé et ne peut pas agir.`);
        }
    }
}

export default Paladin;
