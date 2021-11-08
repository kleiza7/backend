const express = require('express')
const sequelize = require('./database');
const User = require('./User');
const Note = require('./Note');

sequelize.sync().then(() => console.log("db is ready"))

const app = express();

app.use(express.json());

app.get('/users', async(req, res) => {
    const users = await User.findAll();
    res.send(users);
})

app.post('/users/register', async (req, res) => {
    const {username, password} = req.body;
    const obj = {
        username,
        password
    }
    const user = await User.findOne({where:{username}})
    if(!user){
        await User.create(obj);
        res.json({success:true, message:"Başarıyla kayıt olundu."});
    }else{
        res.json({success:false, message:"Kullanıcı adı alınmış, başka bir kullanıcı adı alın lütfen."})
    }

})

app.post('/users/login', async (req, res) => {
    const {username, password} = req.body;
    const obj = {
        username,
        password
    }
    
    const user = await User.findOne({ where: { username, password } });
    if(user){
        res.json({success:true, id:user.id, name:user.username})
    }else{
        res.json({success:false})
    }
})

app.get('/notes/:userId', async(req, res) => {
    const {userId} = req.params;
    
    const notes = await Note.findAll({ where:{userId}});
    res.send(notes);
})

app.post('/notes/:userId', async(req, res) => {
    const {userId} = req.params;
    const user = await User.findOne({where:{id:userId}})
    if(user){
        
    const {message} = req.body;
    const obj = {
        userId,
        message
    }
    const note = await Note.create(obj);
    res.json({success:true, message : note.message})}else{
        res.json(({success:false}))
    }
    
})


app.listen(3000, () => {
    console.log("app is running")
})