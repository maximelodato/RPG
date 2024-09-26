import Character from './Character.js';

class Shaman extends Character {
    constructor(name = 'Thrall') {
        super(name, 12, 150, 3);
    }

    special(target) {
        if (this.mana >= 30 && this.canAct()) {
            this.log(`${this.name} utilise Spirit Heal sur ${target.name}, inflige 3 dégâts et se soigne de 5 PV.`);
            target.takeDamage(3);
            this.hp += 5;
            this.mana -= 30;
            this.log(`${this.name} récupère 5 PV. Il lui reste ${this.hp} PV.`);
        } else if (this.canAct()) {
            this.log(`${this.name} n'a pas assez de mana pour utiliser Spirit Heal, il attaque.`);
            this.dealDamage(target);
        } else {
            this.log(`${this.name} est éliminé et ne peut pas agir.`);
        }
    }
}

export default Shaman;
