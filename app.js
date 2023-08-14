window.addEventListener("load", () => {
    let temperatureDescription = document.querySelector(".condition");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let windSpeed = document.querySelector(".speed");
    let humidity = document.querySelector(".humidity");
    let uvIndex = document.querySelector(".uv");
    let cloudPercentage = document.querySelector(".cloud");
    let feelsLike = document.querySelector(".feelsLike");
    let icon = document.querySelector(".icon");
    let form  = document.getElementById('locationInput');
    let search = document.querySelector(".search");
    let btn = document.querySelector(".submit"); 
    let cities = document.querySelectorAll(".city"); 
    
    let cityInput = "Silchar";
   
    function fetchWeatherData(){
    
                const proxy = "https://cors-anywhere.herokuapp.com/";  //First enable cors
                const api = `${[proxy]}https://api.weatherapi.com/v1/current.json?key=baab78dbd6de47bfb2d110656231503&q=${cityInput}&aqi=yes`;
    
               
    
    
                fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const { temp_c , condition } = data.current; 
    
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temp_c;
                    temperatureDescription.textContent = condition.text;
                    locationTimezone.textContent = data.location.name;
                    feelsLike.innerHTML = data.current.feelslike_c;
                    windSpeed.innerHTML = data.current.wind_kph + "km/h";
                    humidity.innerHTML = data.current.humidity + "%";
                    cloudPercentage.innerHTML = data.current.cloud + "%";
                    uvIndex.innerHTML = data.current.uv;
    

                    const iconId = data.current.condition.icon.substring("//cdn.weatherapi.com/weather/64x64/".length);
                    icon.src = "./icons/" + iconId ;
                
                });
     
    }
    
    
    
    fetchWeatherData();

    
    cities.forEach((city) => {
        city.addEventListener('click', (e) =>{
            cityInput = e.target.innerHTML;
            fetchWeatherData();
        })
        
    });
    
    form.addEventListener('submit', (e) => {
        if(search.value.length == 0){
            alert('Please type in a city name');
        }
        else{
            cityInput = search.value;
            fetchWeatherData();

            search.value = "";

        }

        e.preventDefault();
    });

});
