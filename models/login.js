const pool = require('../database/config');



class loginModel {

    ValUserExistmodel(user, pass){
       const response =  pool.query("SELECT * FROM empresas.tbluser_2 where nombre='"+user+"' and pass='"+pass+"'");

            return response;
        // Conexion.Sentencia("SELECT * FROM empresas.tbluser_2 where nombre='"+user+"' and pass='"+pass+"'",function(results){   
        // });
        
    }

}


module.exports = loginModel;
  