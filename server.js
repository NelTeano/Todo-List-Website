require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 2000;

const Create = require('./models/create');

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('CONNECTED TO THE DATABASE'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.static("public"));




//DISPLAY DATA FINDS ON DATABASE INTO TABLE
app.get('/todolist', async (req, res) =>{

    try {
        const todos = await Create.find()
       
        console.log(todos)
        res.render('index.ejs', { todos: todos });

    } catch (error) {
        res.status(500).json({ message: err.message })
        
    }

})

app.get('/', async (req, res)=>{

    const getall = await Create.find();
    res.json(getall);


})






// DELETE DATA SELECTED IN TABLE
app.post('/todolist/:id', async(req, res) => {
   
    const idToDelete = req.params.id;
    console.log(idToDelete)
    try {

        await Create.deleteOne({ _id: idToDelete });
      

    }catch(error){

        res.status(500).json({ message: err.message })
    }
    res.redirect('/todolist')
})





// CREATING A TODO
app.post('/todolist', async(req, res) => {

    const Newtodo = new Create({
        title: req.body.title,
        description: req.body.desc,
        duedate: req.body.due,
        progress: false
      })

    try {
    
         await Newtodo.save();
        
         
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
    res.redirect('/todolist');
})






