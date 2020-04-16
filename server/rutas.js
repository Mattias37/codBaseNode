const Router=require('express').Router();
const Users= require('./model.js');

Router.get('all', function(err, res){
  // Devolver todos los usuarios del servidor.
  Users.find({}).exac(function(err,docs){
    if (err){
      res.status(500)
      res.json(err)
      console.log("Docs de Users funciona hasta rutas.js")
    }
    res.json(docs)
    console.log("Docs de Users de rutas.js: "+docs)
  })
})
Router.get('/cargar_eventos', function(req, res){
  //retorna eventos guardados.
})
Router.post('/login', function(req, res){

})
Router.post('/agregar_evento', function(req, res){

})
Router.post('/eliminar_evento:id', function(req, res){

})
Router.put('/actualizar_evento:id', function(req, res){

})
