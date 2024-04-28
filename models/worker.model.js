const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;


const workerSchema = new Schema({
    name: {
        type: String,
        default: 'NoN',
        required: true,
        minlength: 2
    },
    surname: {
        type: String,
        default: 'NoN',
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 35
    }, 
    experience: {
        type: Number,
        required: true,
        min: 2
    },
    direction: {
        type: String,
        required: true,
        enum: ['system programmer', 'game developer', 'web developer', 'testers', 'sysAdmin', 'DevOps engineer']
    }
})

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;