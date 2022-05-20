const mysql = require('mysql');

class conexion {

    constructor() {

        this.open = mysql.createConnection({
            host: 'midigitalsat.com',
            database: 'empresas',
            user: 'admin',
            password: 'Heriberto9109'
        });

    }

    Abrir() {

        this.open.connect(function(error){

            if(error){
                throw error;
            }else{
                console.log("Conexion exitosa");
            }
        
        });

    }

    Sentencia(sql){

        this.open.query(sql, function(error,results,fields){

            if(error){
                throw error;
            }else{
                console.log(results);
                // results.forEach(element => {
                //     console.log(element);
                // });     
                return results;
            }
    
        });


    }


    Cerrar() {

        this.open.end();

    }
    
    
}



// const conexion = async (req, res = response) => {

    // open.query('SELECT * FROM empresas.tbluser_2', function(error,results,fields){

    //     if(error){
    //         throw error;
    //     }else{
    //         console.log(results);
    //         results.forEach(element => {
    //             console.log(element);
    //         });     
            
    //     }

    // });
    

// }




module.exports = conexion;