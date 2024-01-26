require('dotenv').config();
const express = require('express');
const router = express.Router();
const BolsaSantiago = require('./bolsaDeSantiago');

router.get('/', async function(req, res) {
    const bolsa = new BolsaSantiago();
    const data = await bolsa.obtenerInstrumentosDispobibles();
    // atravesar lista de instrumentos y obtener el detalle de cada uno
    const instrumentos = data.listaResult;
    const instrumentosDetalle = [];
    for (const instrumento of instrumentos) {
        try {
            const detalle = await bolsa.obtenerResumenInstrumento(instrumento.NEMO);
            instrumentosDetalle.push(detalle);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
    
    const acciones = instrumentosDetalle.map(instrumento => {
        return {
            Nombre: instrumento.Nemo,
            PER: instrumento.Precio_Utilidad
        };
    });
    
    const result = {
        Acciones: acciones
    };
    res.send(result);

});

module.exports = router;
