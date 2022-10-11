/**
 * Model of command params.
 * @param name - Name of param.
 * @param validate - Your custom function to validate the value, returns an error in callback if not valid.
 * @param join - If true, join all the args that come after this.
 */

interface ICommandConfigModel {
    name: string;
    validate?: (value: string) => boolean;
    join?: boolean;
}
/**
 * Command config.
 * @param {Number} description - Description of the command.
 * @param {Number} model - Model of command.
 */
interface ICommandConfig {
    description?: string,
    model: ICommandConfigModel[],
}
/**
 * Command callback.
 * @param error - An error message or null.
 * @param params - Params, configured in the model.
 */
type CommandCallback = (error: string | null, params: Record<string, any>) => void;
/**
 * CLI Command.
 * @param name - Name of the command.
 * @param config - Command config.
 * @param cb - Command callback.
 */
interface ICommand {
    name: string;
    config: ICommandConfig;
    cb: CommandCallback
}

class Command {
    name: string;
    config: ICommandConfig;
    cb: CommandCallback;
    constructor(name: string, config: ICommandConfig, cb: CommandCallback) {
        this.name = name;
        this.config = config;
        this.cb = cb;
    }
    private validate(params: Array<string>) {
        const model = this.config.model;
        let isValidated = true;
        model.forEach((property, index) => {
            let args = [params[index]];
            if (property.join) {
                args = params.slice(index, params.length);
            }
            if (property.validate) {
                for (const arg of args) {
                    const valid = property.validate(arg);
                    if (!valid && isValidated) {
                        isValidated = false;
                        return;
                    }
                }
            }
        });
        return isValidated;
    }
    execute(params: Array<string>) {
        let error: string | null = null;
        const isValid = this.validate(params);
        const formattedParams = this.formatParams(params);
        if (!isValid) error = 'One or more params are invalid.';
        this.cb(error, formattedParams)
    }
    formatParams(params: Array<string>) {
        const model = this.config.model;
        const formattedParams: Record<string, string> = {};
        model.forEach((property, index) => {
            let value = params[index];
            if (property.join) value = params.slice(index, params.length).join(' ')
            formattedParams[property.name] = value;
        });
        return formattedParams;
    }
    getUsage() {
        let usage = this.name;
        const model = this.config.model;
        model.forEach((item) => {
            usage += ` <${item.name}>`;
        });
        return usage;
    }
}

export default Command;
export { ICommand, ICommandConfig, ICommandConfigModel, CommandCallback };