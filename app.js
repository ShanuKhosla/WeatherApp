const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});


app.use(bodyParser.urlencoded({extended: true}));

app.post("/", (req,res) => {
  // console.log();
  const query = req.body.cityName;
  const apiKey = "cb12b8e329be9d3e0d84bfbcfc55c00c";
  const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey +"&units=" + unit;

   https.get(url, function(response) {
     console.log(response.statusCode);

     response.on("data", (data) => {


       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDesc = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


       res.write("<p>The weather is currently " + weatherDesc + "<p>");
       res.write("<h1> The Temp in " + query + " is " + temp + " Celcius </h1>");
       res.write("<img src= " + imageURL + ">");



       res.send()
     });
   });

})









app.listen(3000, function() {
  console.log("WeatherApp Server Started on Port 3000");
});
