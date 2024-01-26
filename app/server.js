require('dotenv').config();
const express = require('express');
const app = express();

// Importamos las rutas de nuestras API
const routes = require('./routes');

app.use(express.json());

app.use('/', routes);

var port = process.env.PORT || 8080  // establecemos nuestro puerto

// iniciamos nuestro servidor
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});