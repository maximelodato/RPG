import Character from './Character.js';

class Berzerker extends Character {
    constructor(name = 'Draven') {
        super(name, 8, 0, 4); // 
    }

    special(target) {
        if (this.canAct()) {
            if (this.hp > 1) { 
                this.log(`${this.name} utilise Rage et gagne +1 de dégâts !`);
                this.dmg += 1; 
                this.hp -= 1; 
            } else {
                this.log(`${this.name} ne peut pas utiliser Rage car il n'a pas assez de PV. Il attaque à la place.`);
                this.dealDamage(target); 
            }
        } else {
            this.log(`${this.name} est éliminé et ne peut pas agir.`);
        }
    }
}

export default Berzerker;
