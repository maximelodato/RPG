import readline from 'readline';
import Game from './Game.js';
import Fighter from './characters/Fighter.js';
import Paladin from './characters/Paladin.js';
import Monk from './characters/Monk.js';
import Berzerker from './characters/Berzerker.js';
import Assassin from './characters/Assassin.js';
import Wizard from './characters/Wizard.js';
import Shaman from './characters/Shaman.js';

const classes = [Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, Shaman];
const names = ['Grace', 'Ulder', 'Moana', 'Draven', 'Carl', 'Lina', 'Arthas', 'Sylvanas', 'Jaina', 'Thrall'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let characters = [];

function addCharacter() {
    console.log("Choisissez votre personnage :");
    classes.forEach((CharacterClass, index) => {
        console.log(`${index + 1}. ${CharacterClass.name}`);
    });

    rl.question("Entrez le numéro de votre personnage ou 'q' pour commencer la partie : ", (choice) => {
        if (choice.toLowerCase() === 'q') {
            if (characters.length === 0) {
                console.log("Vous devez ajouter au moins un personnage avant de commencer la partie.");
                addCharacter(); // Redemander si aucun personnage n'est ajouté
            } else {
                const game = new Game(characters, message => console.log(message));
                game.startGame();
                rl.close(); // Fermer l'interface readline après le jeu
            }
            return;
        }

        const parsedChoice = parseInt(choice, 10);
        if (parsedChoice > 0 && parsedChoice <= classes.length) {
            rl.question("Entrez le nom de votre personnage : ", (characterName) => {
                const playerCharacter = new classes[parsedChoice - 1](characterName);
                characters.push(playerCharacter);
                console.log(`Ajouté : ${characterName} (${playerCharacter.constructor.name})`);
                addCharacter(); // Demander d'ajouter un autre personnage
            });
        } else {
            console.log("Choix invalide. Veuillez réessayer.");
            addCharacter(); // Redemander si le choix est invalide
        }
    });
}

addCharacter(); // Démarrer le processus d'ajout de personnages
