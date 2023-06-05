/**
 * Model of command params.
 * @param name - Name of param.
 * @param validate - Your custom function to validate the value, returns an error in callback if not valid.
 * @param join - If true, join all the args that come after this.
 */
interface CommandConfigModel {
  name: string;
  validate?: (value: string) => boolean;
  join?: boolean;
}
/**
 * Command config.
 * @param {Number} description - Description of the command.
 * @param {Number} model - Model of command.
 */
interface CommandConfig {
  description?: string;
  model: CommandConfigModel[];
}
/**
 * Command callback.
 * @param error - An error message or null.
 * @param params - Params, configured in the model.
 */
type CommandCallback = (
  error: string | null,
  params: Record<string, any>
) => void;

class Command {
  constructor(
    public name: string,
    public config: CommandConfig,
    public cb: CommandCallback
  ) {}

  private validate(params: string[]): boolean {
    const model = this.config.model;

    for (let index = 0; index < model.length; index++) {
      const { validate, join } = model[index];
      const args = join ? params.slice(index) : [params[index]];

      if (validate) {
        const isValid = args.every((arg) => validate(arg));
        if (!isValid) {
          return false;
        }
      }
    }

    return true;
  }

  execute(params: string[]): void {
    const isValid = this.validate(params);
    const formattedParams = this.formatParams(params);
    const error = isValid ? null : "One or more params are invalid.";

    this.cb(error, formattedParams);
  }

  formatParams(params: string[]): Record<string, any> {
    const model = this.config.model;
    const formattedParams: Record<string, any> = {};

    for (let paramIdx = 0; paramIdx < model.length; paramIdx++) {
      const { name, join } = model[paramIdx];
      const value = join ? params.slice(paramIdx).join(" ") : params[paramIdx];
      formattedParams[name] = value;
    }

    return formattedParams;
  }

  getUsage(): string {
    const { name, config } = this;
    const params = config.model.map((item) => `<${item.name}>`).join(" ");
    return `${name} ${params}`;
  }
}

export default Command;
export { CommandConfig, CommandCallback };
