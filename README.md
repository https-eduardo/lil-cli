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
// Initialize passing the process arguments
const cli = new CLI(process.argv);

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
// Register command
cli.registerCommand('say', config, (err, params) => {
    console.log(params.message);
});


// If you want, you can register an callback if no command is found.
// cli.on('notFindAnyCommand', () => {
//     console.log('No command found.')
// });

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