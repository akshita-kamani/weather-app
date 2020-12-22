const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
         res.sendFile(__dirname + "/index.html");
 });

app.post("/", function(req,res){
    
    const query = req.body.cityname;
    const apikey = "520113d2aaf8a0d7135a2fe9b169c7e7" ;
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;

    https.get(url , function(response){
        
        console.log(response.statusCode);
        
        response.on("data", function(data){

            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const country = weatherdata.name;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.set("Content-Type", "text/html"); //to write html tag in .write method
    
            res.write(`temprature: ${temp} </br>
             country:${country} </br> 
             description: ${description} </br> 
             <img src="${imgurl}">`);
            
            res.send();
            })
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("running");
});