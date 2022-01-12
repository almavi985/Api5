/ Instanciamos mongoose */
const mongoose = require('mongoose');

/* Conexión con la base */
mongoose.connect('mongodb://localhost:27017/m3');

/* Crear modelo */

const Usuario = mongoose.model('Usuario', {
    firstname: String,
    lastname: String,
}, 'usuario');

/* Instanciamos un objeto del modelo */

const ramon = new Usuario({
    firstname: 'Ramón',
    lastname: 'Martínez',
})

ramon.save().then(() => console.log('Se guardó el elemento'));