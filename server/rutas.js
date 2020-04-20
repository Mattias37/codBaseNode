
const Router = require('express').Router();
const UserModel = require('./model.js');
const EventoModel = require('./eventoModel.js')

Router.get('/all', function(err, res){
  // Devolver todos los usuarios del servidor.
  console.log('Llegamos a rutas.js /all')
  UserModel.find({}).exec(function(err,docs){
    if (err){
      console.log("Docs de Users funciona hasta rutas.js")
      res.status(500)
      return res.json(err)

    }
    return res.json(docs)
    console.log("Docs de Users de rutas.js: "+docs)
  });
});

Router.get('/cargar_eventos', function(req, res){
  //retorna eventos guardados.
  EventoModel.find({},{"_id":0,"title":1,"start":1,"end":1}).exec(function(err,docs){
		if(err){

        res.status(500)
			  return res.json(err)


		}
		return res.json(docs)
    console.log(docs)
	});
})
Router.post('/1login', function(req, res){
  console.log("hola llegamos a rutas.js /1login")
  let Matty = new UserModel({ idUser: 1094267698,nombre: 'Matty Bylin', email:"mattiasbylin@hotmail.com",contrasenna:'12345', estado:'Activo'})
  Matty.save((error)=>{
    if(error)console.log(error)
    console.log('Registro Guardado')
  })
  res.send("se guardo")
})
Router.post('/login', function(req, res){
  console.log("hola llegamos a rutas.js /login")
  UserModel.find({email:req.body.user, contrasenna:req.body.pass}, function(err,doc){

    if(err){
      res.status(500)
      res.json(err)
      console.log(err)
    }
    if(doc!=""){
      res.send("Validado");
    }else{
      res.send("no existe usuario");
    }
  })
})

Router.post('/agregar_evento', function(req, res){
console.log('agergar evento')
  let evento = new EventoModel({
		title:req.body.title,
		start:req.body.start,
		end:req.body.end,
    iduserevents: req.UserModel
	})

  evento.save(function(error){
		if(error){
      return res.json(error)
			res.status(500)
		}
		return res.send("Registro Guardado")
    console.log('Registro Guardado')
	})
})
Router.post('/eliminar_evento', function(req, res){
  console.log('eliminar evento rutas.js');
  let uid = req.body.eventId
  console.log(req.body.eventId)
    EventoModel.remove({title: uid.value}, function(error) {
        if(error) {
            res.status(500)
            return res.json(error)
        }
         return res.send("Registro eliminado")
    })
})
Router.put('/actualizar_evento:id', function(req, res){
  let evento=new EventoModel({
    title:req.body.title,
		start:req.body.start,
		end:req.body.end
	})
	evento.update(function(error){
		if(error){
			res.status(500)
			res.json(error)
		}
		res.send("Registro Guardado")
	})
})

module.exports=Router
