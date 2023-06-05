# Lil-CLI

* [Usage](#how-to-use)
* [Examples](#examples)
* [Download](#download)
* [Running examples](#how-to-run-examples)

A lightweight lib that makes more easier to create a CLI (Command Line Interface), with your own commands and it custom params, that can be easily validated too. 


### How to use:
You just need to register the commands that your application will have and configure the validators of the params, if it have.

For example:
```js
import CLI from 'lil-cli';
// This path will be optimized in a next version
import CLIEvents from 'lil-cli/dist/events';
// Initialize the CLI class
const cli = new CLI();

// Create command config
const config = {
    description: 'Send a message',
    model: [
        {
            name: 'say',
            join: true
        }
    ]
}

// If you want, you can register an event, for any purpose.
// CLIEvents.on('onTriggerCommand', () => {
//     console.log('An command was triggered.')
// });

// Register command
cli.registerCommand('say', config, (err, params) => {
    // Emitting an event
    // CLIEvents.emit('onTriggerCommand')
    console.log(params.message);
});

cli.listen();
```

## Examples
* [Generating passwords](./examples/password-generator/index.js).

## Download
If you're using npm, run in your project:
```sh
npm install lil-cli
```
or if you're using yarn:
```sh
yarn add lil-cli
```

## How to run examples
```sh
cd ./examples
npm install
// choose one of examples, ex:
npm run start-password-generator
```
