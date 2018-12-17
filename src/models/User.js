const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
    date:{type:Date,default:Date.now}
});

//Mode (Nombre,Esquema)
module.exports = mongoose.model('Note',UserSchema);