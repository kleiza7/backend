const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class User extends Model {

}


User.init({
    username:{
        type:DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    messages:{
        type: DataTypes.JSON
    }
}, {
    sequelize,
    modelName : "user"
})


module.exports = User;