import * as fs from 'fs';
import Command, { CommandCallback, ICommandConfig } from './command';

class CLI {
    registeredCommands: Array<Command> = [];
    eventsCallbacks: Record<string, Function> = {};
    private args: Array<string> = [];
    constructor(args: Array<string>) {
        let isSearching = false;
        args.forEach(arg => {
            try {
                if (isSearching)
                    this.args.push(arg);
                else
                    fs.lstatSync(arg);
            } catch {
                this.args.push(arg);
                isSearching = true;
            }
        });
    }
    getRegisteredCommands() {
        return this.registeredCommands;
    }
    registerCommand(name: string, config: ICommandConfig, cb: CommandCallback) {
        this.registeredCommands.push(new Command(name, config, cb));
    }
    listen() {
        let commandFound = false;
        this.registeredCommands.forEach((command) => {
            if (this.args[0] === command.name) {
                commandFound = true;
                let commandParams: Array<string> = [];
                const argsLength = this.args.length;
                if (argsLength > 1) {
                    commandParams = this.args.slice(1, argsLength)
                }
                command.execute(commandParams);
            }
        });
        if (!commandFound) {
            const callback = this.eventsCallbacks['notFindAnyCommand'];
            callback();
        }
    }
    on(eventName: 'notFindAnyCommand', cb: Function) {
        switch (eventName) {
            case 'notFindAnyCommand':
                this.eventsCallbacks[eventName] = cb;
        }
    }
}

export default CLI;