//Get All rates for a symbol
//http://data.fixer.io/api/latest?access_key=bd8d96c8e70ed81deab8fc63db4e9465&country=EUR
//Access Key = bd8d96c8e70ed81deab8fc63db4e9465

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const manager = require('./manager');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

//////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(cors());
const m = manager();
////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/api", (req, res) => {
    // Here are the resources that are available for users of this web API...
    const links = [];
    // This app's resources...
    links.push({ "rel": "collection", "href": "/api/rates", "methods": "GET,POST,PUT"});
  
    const linkObject = { 
      "apiName": "Buying Power Api",
      "apiDescription": "API for Currency DB",
      "apiVersion": "1.0", 
      "apiAuthor": "Jonathan Brown",
      "links": links
    };
    res.json(linkObject);
});

app.all('/', function(req, res, next) {
    //Add Header for hosted link
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin: http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

//Routes

//Base Get request
/* This request is going to call to the Forex API for all rates related to the selected Base*/
app.get('/api/rates/:base', (req,res) =>{
    m.getRates(req.params.base)
    .then((data) =>{
        res.status(200).json(data);
    })
    .catch((err) =>{
        res.status(404).json({'message': 'Resource Not Found'});
    })
    
    
})

//Get Countries from Database
app.get('/api/countries', (req,res) =>{
    m.getCountries()
    .then((data) =>{
        res.status(200).json(data);
    })
    .catch((error) =>{
        res.status(404).json({'message': error});
    })
    
    
})

app.get('/api/currencies', (req,res) =>{
    m.getCodes()
    .then((data) =>{
        res.status(200).json(data);
    })
    .catch((error) =>{
        res.status(404).json({'message': error});
    })
    
    
})



//Not found
app.use((req, res) => {
    res.status(404).send("Resource not found");
  });

  m.connectToDb().then( () => {
      app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
  })
    .catch((err) => {
      console.log("Unable to start the server:\n" + err);
      process.exit();
    });


