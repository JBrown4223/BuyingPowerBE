const request = require('request');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'dbadmin1',
    host: 'localhost',
    database: 'countries',
    password: 'qwerty2323',
    port: 5432,
  })

module.exports = function() {
    let ratesTemp, codeArray;
    return {
        connectToDb: function(){
           
            pool.connect();

            return new Promise((resolve,reject) =>{
                pool.on('error', (error) => {
                    reject(error);
                });

                resolve();
                console.log("Connection Successful");
            })
           
        },

        getRates: function(base){
         return new Promise((resolve,reject) =>{
                request(`https://api.frankfurter.app/latest?from=${base}`,{ json: true }, (err, res, body) => {
                  if(err){ 
                     reject();
                     console.log(err);
                    }
                  if(body){
                     console.log('Retrieval From External API Successful');
                     ratesTemp = this.extract(body.rates)
                     resolve(ratesTemp);
                     
                    }
                })
            });
        },

        getCountries: function(){
            return new Promise((resolve,reject) =>{
                pool.query('SELECT * FROM countrycode ORDER BY countrycode ASC', (error,results) => {
                   if(error){
                     reject();
                     console.log('Retrieval failed')
                   }
                     resolve(results.rows);
                     console.log('Retrieval From DB Successful'); 

                     
                   
                })
              
            });
        },

        getCodes: function(){
            return new Promise((resolve,reject) =>{
                request(`https://api.frankfurter.app/currencies`,{ json: true }, (err, res, body) => {
                  if(err){ 
                     reject();
                     console.log(err);
                    }
                  if(body){
                     console.log('Retrieval From External API Successful');
                     codeArray = this.extractCodes(body)
                     resolve(codeArray);
                     
                    }
                })
            });
        },

        extract : function(values){
            let k = []
            let j = JSON.parse(JSON.stringify(values), (key, value) =>{
                
                    k.push({"Code":key,"exRate":value})  
            })
            k.pop();
            console.log("Extraction from JSON String Complete")
            return k
        },
        extractCodes : function(values){
            let k = []
            let j = JSON.parse(JSON.stringify(values), (key, value) =>{
                
                    k.push({"Code":key,"Currency":value})  
            })
            k.pop();
            console.log("Extraction from JSON String Complete")
            return k
        }
    }
}



