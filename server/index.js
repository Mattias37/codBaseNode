/*
1.Importar los modulos.
//modulo http:creacion del servidor http const http
//modulo.path:resolver direcciones y rutas de archivos estaticos
//modulo express: para crear la aplicacion sobre el servidor http, definicion de rutas en el lado del servidor
//modulo rutas: utilice las rutas ya creadas en rutas.js
//modulo mongoose: para intepretar diferentes tipos de datos que viajan en el cuerpo de las peticiones(json)
2.Definimos el puerto y la aplicacion express
3. Creamos el server con un evento listener para saber que si funciona.
4. Se define que se debe usar body-parser
5. Se indica los archivos esaticos.

*/
const http= require('http'),
		path= require('path'),
		express= require('express'),
	//	Routing= require('./rutas.js'),
		bodyParser= require('body-parser'),
		mongoose= require('mongoose');

const PORT = 3000
      app  = express()

const Server = http.createServer(app);

//mongoose.connect("mongodb://localhost/agendaBD");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//app.use(express.static('../client'));
app.use(express.static(__dirname + "/../client"));
// app.use('/users', Routing);

Server.listen(PORT, function(){
	console.log("Se establecio conexion con el servidor en el puerto: " +PORT);
});
