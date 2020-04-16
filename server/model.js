const mongoose= require('mongoose');
const Schema= mongoose.Schema;

let UserSchema= new Schema({
	idUser: {type:Number, require:true, unique: true},
	nombre: {type:String, require:true},
	email: {type:String, require:true},
	contrasenna: {type:String, require:true},
	estado: {type:String, require:true, enum:['Activo', 'Inactivo']}
});
let UserModel= mongoose.model('Usuario', UserSchema);

module.exports= UserSchema;
//creacion del primer usuario
var PrimerUser= new UserModel({
	idUser: 1094267608,
	nombre: 'Mattias Bylin',
	email: 'mattiasbylin@hotmail.com',
	contrasenna: '12345',
	estado: 'Activo'
});
