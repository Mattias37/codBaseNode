const mongoose= require('mongoose');
const Schema= mongoose.Schema;

let UserSchema= new Schema({
	idUser: {type:Number, require:true, unique: true},
	nombre: {type:String, require:true},
	email: {type:String, require:true},
	contrasenna: {type:String, require:true},
	estado: {type:String, require:true, enum:['Activo', 'Inactivo']}
});
let UserModel = mongoose.model('Usuario', UserSchema);
UserModel.on('error', (err) => {
   console.log(err.message)
});
module.exports= UserModel;
