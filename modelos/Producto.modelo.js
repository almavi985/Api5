const mongoose=require('mongoose')

const ProductoSchema=new mongoose.Schema({
    nom:{type:String,
        required:true},
    precio:{type:Number,
    required:true},
    talla:{type:String,
    required:true},
    cant:{type:String,
    required:true},
    imagen:{type:String,
    required:true},
    desc:{type:String,
    required:true},
    
});
mongoose.model('Producto',ProductoSchema,'ProductoBD')
