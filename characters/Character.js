class Character {
    constructor(name, hp, mana, dmg) {
        this.name = name;
        this.hp = hp;
        this.mana = mana;
        this.dmg = dmg;
        this.status = 'playing';
    }

    canAct() {
        return this.hp > 0 && this.status === 'playing';
    }

    log(message) {
        if (this.canAct()) { 
            console.log(message);
        }
    }

    dealDamage(victim) {
        if (this.canAct() && victim.canAct()) {
            this.log(`${this.name} attaque ${victim.name} et inflige ${this.dmg} dégâts.`);
            victim.takeDamage(this.dmg);
            if (victim.hp <= 0) {
                this.mana += 20;
                this.log(`${this.name} regagne 20 points de mana.`);
            }
        } else {
            this.log(`${this.name} ne peut pas attaquer ou la cible est déjà éliminée.`);
        }
    }

    takeDamage(dmg) {
        if (this.hp > 0) {
            this.hp -= dmg;
            this.log(`${this.name} reçoit ${dmg} dégâts. Il lui reste ${this.hp} points de vie.`);
            if (this.hp <= 0) {
                this.status = 'loser';
                this.hp = 0;
                this.log(`${this.name} est éliminé.`);
            }
        } else {
            this.log(`${this.name} est déjà éliminé et ne peut pas recevoir de dégâts.`);
        }
    }
    

    isAlive() {
        return this.hp > 0;
    }
}

export default Character;
