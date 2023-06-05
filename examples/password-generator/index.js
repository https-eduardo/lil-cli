const CLI = require('lil-cli').default;
const { generatePasswords } = require('./generator');

const cli = new CLI();
const config = {
    description: 'Generate an amount of passwords with determinated length.',
    model: [
        {
            name: 'amount',
            validate: (value) => !!Number(value),
        },
        {
            name: 'length',
            validate: (value) => !!Number(value),
        }
    ]
}

cli.registerCommand('gen', config, (err, params) => {
    if (err) {
        console.log(err)
        return;
    }
    const amount = params.amount ?? 1;
    const passwordLength = params.length ?? 8;
    const data = generatePasswords(amount, passwordLength);
    console.log("PASSWORD GENERATOR")
    console.log("Passwords generated: ")
    console.table(data);
});

cli.listen();