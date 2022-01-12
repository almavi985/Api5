const mongoose = require('mongoose'),
    Producto = mongoose.model('Producto');

const addP = async (req, res) => {
    try {
        const producto = new Producto(req.body);

        const resp = await producto.save();

        return res.json({
            msj: 'Producto agregado ',
            detail: resp
        })
    } catch (e) {
        return res.json({
            msj: 'Error',
            detail: e
        })
    }
}


const obtP = async (req, res) => {
    try {
        const resp = await Producto.find();

        if (resp.length === 0) {
            return res.json({
                msj: 'Error',
                detail: 'No se encontraron registros'
            })
        } else {
            return res.json({
                msj: 'Elementos encontrados',
                detail: resp
            })
        }
    } catch (e) {
        return res.json({
            msj: 'error',
            detail: e.message
        })
    }
}

module.exports = {
    addP,
    obtP
}