const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');



//Crear servidor express

const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())

//Directorio Publico
app.use( express.static('public') )

//Read and parse body
app.use( express.json() )

//Rutas
//TODO: AUTH -> CREAR, LOGIN, RENEW
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: EVENTOS
app.use('/api/events', require('./routes/events'));


//Escuchar peticiones
app.listen(process.env.PORT , () => {
    console.log(`Running on port ${ process.env.PORT }`)
});

