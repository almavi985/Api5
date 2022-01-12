const{
    cuenta,
    getUser,
    updateUser,
    deleteUser,
    sesion
}=require('./Usuario.controlador');

const{
    addP,
    obtP
}=require('./Producto.controlador');


module.exports={
    cuenta,
    getUser,
    updateUser,
    deleteUser,
    sesion,
    addP,
    obtP 
}