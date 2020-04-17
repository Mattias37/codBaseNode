
const Router = require('express').Router();
const UserModel = require('./model.js');
const EventoModel = require('./eventoModel.js')

Router.get('/all', function(err, res){
  // Devolver todos los usuarios del servidor.
  console.log('Llegamos a rutas.js')
  UserModel.find({}).exec(function(err,docs){
    if (err){
      console.log("Docs de Users funciona hasta rutas.js")
      res.status(500)
      res.json(err)

    }
    res.json(docs)
    console.log("Docs de Users de rutas.js: "+docs)
  });
});

Router.get('/cargar_eventos', function(req, res){
  //retorna eventos guardados.
  EventoModel.find({},{"_id":0,"title":1,"start":1,"end":1}).exec(function(err,docs){
		if(err){
			res.status(500)
			res.json(err)
		}
		res.json(docs)
	});
})

Router.post('/login', function(req, res){
  console.log("hola llegamos a rutas.js")
  /*let Ani = new UserModel({ idUser: 1094267698,nombre: 'Ani Bylin', email:"anibylin@hotmail.com",contrasenna:'12345', estado:'Activo'})
  Ani.save((error)=>{
    if(error)console.log(error)
    console.log('Registro Guardado')
  })*/

  UserModel.find({email:req.body.user, contrasenna:req.body.pass}, function(err,doc){

    if(err){
      res.status(500)
      res.json(err)
      console.log(err)
    }
    console.log(doc)
    if(doc!=""){
      res.send("Validado");
    }else{
      res.send("no existe usuario");
    }
  })
})
/*
Router.post('/agregar_evento', function(req, res){

})
Router.post('/eliminar_evento:id', function(req, res){

})
Router.put('/actualizar_evento:id', function(req, res){

})
*/
module.exports=Router
