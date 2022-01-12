/* Instanciamos mongoose */
const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    uniqueValidator = require('mongoose-unique-validator');

/*creacion del esquema*/
const UsuarioSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    ape: { type: String, required: true },
    dir: { type: String, required: true },
    email: {
        type: String,
        required: [true, 'Se requiere email'],
        unique: [true, 'Ya se encuentra registrado'],
        match: [/\S+@\S+\.\S+/, 'Email invalido']
    },
    password: { type: String },
    salt: { type: String }
});
/*Valor unico para cada usuario y no haya repetidos*/
UsuarioSchema.plugin(uniqueValidator, { message: 'Ya esta registrado, intente otro' });
/*Metodo de encriptacion de psw*/
UsuarioSchema.methods.generateJWT = function () {
    return jwt.sign({ idUsuario: this._id, type: this.type }, process.env.SECRET_JWT);
}
//Encriptar psw
UsuarioSchema.methods.hashpsw = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex')
}
/*Metodo de verificacion de contraseña*/
UsuarioSchema.methods.verifyPassword = function (password) {
    const vpsw = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return vpsw === this.password;
}

mongoose.model('Usuario', UsuarioSchema, 'UsuarioDB');

