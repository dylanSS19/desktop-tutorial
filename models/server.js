const express = require('express');
const cors = require('cors');
const req = require('express/lib/request');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }
 
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {

        // this.app.get('/api',(req,res)=>{
        //     res.send('Hola esta es la respuesta');
        // });

        // this.app.post('/',(req,res)=>{
        //     res.send('Hola esta es la respuesta');
        // });

         this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;
