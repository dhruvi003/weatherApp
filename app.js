const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

     res.sendFile(__dirname + "/index.html");

   
});

app.post("/",function(req,res){ 
    console.log("post received");

    const query = req.body.cityName;
    const appid = "b189d70e25fcd516337d289ec9ffdc23";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + appid;
    https.get(url,function(responce){
        console.log(responce.statusCode);

        responce.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const  tempInCelcius = Math.floor(temp - 273);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;


            console.log(temp);
            console.log(weatherDescription);

            res.write("<p> The weather is currently " + weatherDescription + "</p>");
            res.write("<h1> The temp in " + query+ " is " + tempInCelcius + " degree C" + "</h1>" );

            res.send();

        });
    });


});



app.listen(3000,function(){
    console.log("server is running on port 3000...");
});