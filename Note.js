const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class Note extends Model {}


Note.init({
    userId:{
        type: DataTypes.NUMBER
    },
    message:{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName : "note"
})


module.exports = Note;