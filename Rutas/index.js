const express = require('express'),
    router = express.Router(),
    productoRouter=require('./Producto.router'),
    usuarioRouter = require('./Usuario.router');


router.get('/',(req,res)=>{
    res.send(`
    <h1>Welcome </h1>
    `)
})

router.use('/Usuario', usuarioRouter);
router.use('./Producto',productoRouter);


module.exports = router;