// const loginModel = require('../models/login.js');

// const Login = new loginModel();

const pool = require('../database/config');

const ValUserExist = async (req, res = response) => {

    const { user, password } = req.body;

    const Valusuario = await  pool.query("SELECT idtbluser_2, nombre, pass, privilegios, status, img_perfil, Correo FROM empresas.tbluser_2 where nombre='"+user+"' and pass='"+password+"'");

    if(Valusuario.length <= 0){

      return res.status(400).json({
        msg: 'Usuario / Password no son correctos'
      });

    }

    const loginResult = Valusuario.map((item)=> {    

      if(user == item.nombre && password == item.pass){
        
        const usuario = {
          idtbluser_2: item.idtbluser_2,
          pass: item.pass,
          nombre: item.nombre,
          privilegios: item.privilegios,
          status: item.status,
          img_perfil: item.img_perfil,
          Correo: item.Correo
        }

        return res.json({usuario});

      }else{
        
        return res.status(400).json({
          msg: 'Usuario / Password no son correctos'
        });

      }
      
    });

   

}


module.exports = {
    ValUserExist,
  }