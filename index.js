require('dotenv').config();

const   mongoose = require('mongoose'),
        chalk = require('chalk'),
        mongoUrl = process.env.MONGO_URL,
        Worker = require('./models/worker.model'),
        http = require('http'),
        url_module = require('url');


// Добавление пользователя в бд
async function main(user){
    await mongoose.connect(mongoUrl)
        .then(() => console.log(chalk.green('Successful connection')));

    const worker = new Worker({
        name: user.name,
        surname: user.surname,
        age: user.age,
        experience: user.experience,
        direction: user.direction,
    })

    await worker.save();
}


const { host, port } = process.env

const server = http.createServer((req, res) => {
    const   { method, url } = req,
            { pathname, query } = url_module.parse(url, true);

    if(method === "POST" && pathname === "/resume"){
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            try{
                const { name, surname, age, experience, direction } = JSON.parse(body);

                if (!name || !surname || !age || !experience || !direction) {
                    res.writeHead(400);
                    res.end("Invalid data");
                    return;
                }

                main({ name, surname, age, experience, direction }).catch(err => console.log(chalk.red(err))); 

                res.writeHead(200)
                res.end("User added to database")
            }catch (err) {
                res.writeHead(400);
                res.end(err.message)
            }
        })
    }
})  

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

