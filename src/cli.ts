import Command, { CommandCallback, CommandConfig } from "./command";
import CLIEvents from "./events";

class CLI {
  registeredCommands: Command[] = [];
  private args: string[];

  constructor() {
    // Remove the nodejs path and current directory from process.argv
    this.args = process.argv.slice(2);
    CLIEvents.on("notFindAnyCommand", () => {
      throw new Error("Not found any command.");
    });
  }

  getRegisteredCommands(): Command[] {
    return this.registeredCommands;
  }

  registerCommand(
    name: string,
    config: CommandConfig,
    cb: CommandCallback
  ): void {
    const command = new Command(name, config, cb);
    this.registeredCommands.push(command);
  }

  listen(): void {
    let commandFound = false;

    for (const command of this.registeredCommands) {
      if (this.args[0] === command.name) {
        commandFound = true;
        const commandParams = this.args.slice(1);
        command.execute(commandParams);
        break;
      }
    }

    if (!commandFound) {
      CLIEvents.emit("notFindAnyCommand");
    }
  }
}

export default CLI;
