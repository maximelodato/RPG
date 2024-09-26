import Fighter from './characters/Fighter.js';
import Paladin from './characters/Paladin.js';
import Monk from './characters/Monk.js';
import Berzerker from './characters/Berzerker.js';
import Assassin from './characters/Assassin.js';
import Wizard from './characters/Wizard.js';
import Shaman from './characters/Shaman.js';
import Character from './characters/Character.js';

const classes = [Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, Shaman];
const names = ['Grace', 'Ulder', 'Moana', 'Draven', 'Carl', 'Lina', 'Arthas', 'Sylvanas', 'Jaina', 'Thrall'];

class Game {
    constructor(playerCharacters, displayOutput) {
        this.playerCharacters = playerCharacters;
        this.characters = this.generateRandomCharacters();
        this.turnLeft = 10;
        this.displayOutput = displayOutput; // Assurez-vous que ceci est défini
    }

    log(message) {
        this.displayOutput(message); // Utilisation de displayOutput
    }

    generateRandomCharacters() {
        const characters = [];
        const shuffledNames = [...names].sort(() => 0.5 - Math.random()).slice(0, 5); 
        shuffledNames.forEach(name => {
            const RandomClass = classes[Math.floor(Math.random() * classes.length)];
            const character = new RandomClass(name);
            console.log(`Created character: ${character.name}, Instance of: ${character instanceof Character}`);

            if (!this.playerCharacters.some(pc => pc.name === character.name)) {
                characters.push(character);
            }
        });
        characters.push(...this.playerCharacters); 
        console.log("Final characters array:", characters);
        return characters;
    }

    watchStats() {
        this.log("══════════════════════════════");
        this.log("💥  Statistiques des Personnages  💥");
        this.characters.forEach(character => {
            const statusIcon = character.status === 'playing' ? '🟢' : (character.status === 'loser' ? '❌' : '🏆');
            this.log(`
                ${statusIcon}  ${character.name} :
                ❤️  PV: ${this.formatStat(character.hp)} 
                🔮  Mana: ${this.formatStat(character.mana)}
                ⚔️  Dégâts: ${character.dmg}
                🛡️  Statut: ${character.status === 'playing' ? 'En combat' : (character.status === 'loser' ? 'Éliminé' : 'Gagnant')}
            `);
        });
        this.log("══════════════════════════════");
    }

    formatStat(stat) {
        if (stat <= 0) return `🔴 ${stat}`;
        else if (stat <= 5) return `🟠 ${stat}`;
        else return `🟢 ${stat}`;
    }

    startTurn(turnNumber) {
        this.log(`C'est le tour ${turnNumber}.`);
        const aliveCharacters = this.characters.filter(c => c.canAct());

        this.watchStats();

        this.playerCharacters.forEach(playerCharacter => {
            if (playerCharacter.canAct()) {
                this.log(`C'est à ${playerCharacter.name} de jouer.`);
                const targetsForPlayer = aliveCharacters.filter(c => c !== playerCharacter);
                const playerTarget = targetsForPlayer[Math.floor(Math.random() * targetsForPlayer.length)];
                playerCharacter.dealDamage(playerTarget);

                if (!playerTarget.canAct()) {
                    this.log(`${playerTarget.name} a été éliminé.`);
                }
            }
        });

        aliveCharacters.forEach(character => {
            if (!character.canAct()) return;

            this.log(`C'est à ${character.name} de jouer.`);
            const targetsForAI = aliveCharacters.filter(c => c !== character);
            const aiTarget = targetsForAI[Math.floor(Math.random() * targetsForAI.length)];

            character.dealDamage(aiTarget);

            if (!aiTarget.canAct()) {
                this.log(`${aiTarget.name} a été éliminé.`);
            }
        });

        this.watchStats();

        const remainingCharacters = this.characters.filter(c => c.canAct());
        if (remainingCharacters.length === 1) {
            remainingCharacters[0].status = 'winner';
            this.log(`${remainingCharacters[0].name} a gagné la partie !`);
            return false; 
        }
        return true;
    }

    skipTurn() {
        this.turnLeft -= 1;
        this.log(`Il reste ${this.turnLeft} tours.`);
    }

    startGame() {
        let turnNumber = 1;
        while (this.turnLeft > 0 && this.characters.filter(c => c.canAct()).length > 1) {
            const continueGame = this.startTurn(turnNumber);
            if (!continueGame) break;
            this.skipTurn();
            turnNumber += 1;
        }

        if (this.turnLeft === 0) {
            const remainingCharacters = this.characters.filter(c => c.canAct());
            remainingCharacters.forEach(c => c.status = 'winner');
            this.log("La partie est terminée. Voici les gagnants :");
            remainingCharacters.forEach(c => this.log(`${c.name} est gagnant avec ${c.hp} PV restants.`));
        }
    }
}

export default Game;
