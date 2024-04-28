require('dotenv').config();

const   mongoose = require('mongoose'),
        chalk = require('chalk'),
        mongoUrl = process.env.MONGO_URL,
        Worker = require('./models/worker.model');


async function main(){
    await mongoose.connect(mongoUrl)
        .then(() => console.log(chalk.green('Successful connection')));

    const worker = new Worker({
        name: 'Elliot',
        surname: 'Alderson',
        age: 25,
        experience: 7,
        direction: 'system programmer'
    })

    await worker.save();
}

main().catch(err => console.log(chalk.red(err)));