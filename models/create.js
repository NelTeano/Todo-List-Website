
const mongoose = require('mongoose');


const CreateTodo = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duedate:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    progress:{
        type: Boolean,
    }


})

module.exports = mongoose.model('Todos', CreateTodo)