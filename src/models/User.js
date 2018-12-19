const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name:{type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
    date:{type:Date,default:Date.now}
});
//Esquema.methods para agregar metodos al esquema
//Encriptación de pass
UserSchema.methods.encryptPassword = async (password) => {
    //generamos hash
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password,salt);
    return hash;
};
//Comparacion de la contraseña
UserSchema.methods.matchPassword = async function(password)
{
    return await bcrypt.compare(password,this.password);
};
//User (Nombre,Esquema)  
module.exports = mongoose.model('User',UserSchema);