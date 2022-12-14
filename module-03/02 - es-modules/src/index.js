import TerminalController from './terminalController.js';
import database from './../database.json' assert { type: 'json' };
import Person from './person.js';

const DEFAULT_LANG = 'pt-br';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question('What?? ');
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('process finished!');
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    console.log('person', person.formatted(DEFAULT_LANG));
    return mainLoop();
  } catch (error) {
    console.error('Something wrong occurred');
  }
}

await mainLoop();
