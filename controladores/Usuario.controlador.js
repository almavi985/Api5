const moongose=require('mongoose'),
Usuario=moongose.model('Usuario')

const cuenta=async(req,res)=>{
    try{
        const usuario=new Usuario(req.body);//instanciamos usuario
        usuario.hashpsw(req.body.password)

        //salvar el usuario
        const resp=await usuario.save();

        return res.status(200).json({
            msj:'El usuario fue creado',
            detail: resp.generateJWT()
        })

    }catch(e){
        return res.status(400).json({
            msj:'Error',
            detail:e.message
        })
    }
}

const sesion=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const resp=await Usuario.findOne({email});

        if(!resp){
            return res.status(404).json({
                msj:'Error',
                detail:'Usuario no registrado'
            })
        }

        if(resp.verifyPassword(password)){
            return res.status(200).json({
                msj:'Bienvenido',
                detail:resp.generateJWT()
            })
        }
        return res.status(400).json({
            msj:'Error',
            detail:'Psw incorrecta, intentelo de nuevo'
        })

    }catch(e){
        return res.status(400).json({
            msj:'Ocurrio un error',
            detail:e.message
        })
    }
}

const getUser=async (req,res)=>{
   try{
       const resp=await Usuario.find();
       if(resp.length===0){
           return res.json({
               msj:'Ha ocurrido un error',
               detail:'No se encontro ningun registro'
           })
       }else{
           return res.json({
               msj:'Registros encontrados: ',
               detail:resp
           })
       }
   }catch(e){
       return res.json({
           msj:'Error',
           detail:e.message
       })
   }
}

const updateUser=async(req,res)=>{
    try{
        const nuDato=req.body;


        const resp=await Usuario.findByIdAndUpdate(
            nuDato.userId,
            {$set:nuDato},
            {new:true}
        )
        return res.json({
            msj:'El usuario ha sido actualizado',
            detail:resp
        })
    }catch(e){
        return res.json({
            msj:'Error',
            detail:e.message
        })
    }
}

const deleteUser=async(req,res)=>{
    try{
        const resp=await Usuario.findByIdAndDelete(req.params.id)
        return res.json({
            msj:'El usuario ha sido eliminado',
            detail:resp
        })
    }catch(e){
        return res.json({
            msj:'Error',
            detail:e.message
        })
    }
}

module.exports={
    cuenta,
    getUser,
    updateUser,
    deleteUser,
    sesion
}