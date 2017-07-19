$(document).ready(function() {
    getLocation();
  });      

var temperatureVal={};    
var isCelisus={
    "flag":true
};
var section = document.getElementById("main-section"); 
function getLocation() {
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(getWeatherData);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeatherData(position) {
    
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    /*alert("Latitude: " + lat + 
    "<br>Longitude: " + lon);*/
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon,function(json){
       // image setting
       var html="";
       html += '<div id="weather-img">';
       html += '<img src="'+json.weather[0].icon+'" alt="Weather Image">'
       html += '</div>';
       
        $("#weather-img-container").html(html);
               
            window.temperatureVal = {"temp":json.main.temp};
            $("#weather-type").html(json.weather[0].main+' ('+json.weather[0].description+')');
            $("#temp-value").html(window.temperatureVal.temp);
            $("#temp-symbol").html('°C');               
        /*symbol.addEventListener("click",function(){
                convertTemp(window.temperatureVal.temp);
            },false);*/
            convertBtn.addEventListener("click",function(){
                convertTemp(window.temperatureVal.temp);
            });
        $("#location-name").html(json.name+', '+json.sys.country);
})
            window.section.style.visibility = 'visible';
}
    var symbol = document.getElementById("temp-symbol");
    var convertBtn = document.getElementById("convert-btn");
    function convertTemp(val){
        var temperature;
        if(this.isCelisus.flag){
            temperature = (val*9/5)+32;
            $("#temp-symbol").html('F');
            $("#temp-unit").html('Celsius');
            this.isCelisus = {"flag":false};
        }else{
            temperature = (val-32)*5/9;
            $("#temp-symbol").html('°C');
            $("#temp-unit").html('Fahrenheit');
            this.isCelisus = {"flag":true};
        }
        $("#temp-value").html(temperature.toPrecision(4));
        window.temperatureVal = {"temp":temperature};     
    }
