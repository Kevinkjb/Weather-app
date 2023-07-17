
const inputElement = document.querySelector('.input-element');
const searchButton = document.querySelector('.search-button');
const cityNameDisplay = document.querySelector('.city-title');
const cityTemperature = document.querySelector('.temperature')
const weatherImage = document.querySelector('.weather-image');
const humidityResult = document.querySelector('.humidity-result');
const windSpeed = document.querySelector('.wind-speed');
const error = document.querySelector('.error');



searchButton.addEventListener('click', () =>{
    const cityName = inputElement.value;
    weatherData(cityName);
    inputElement.value = ''
})

inputElement.addEventListener('keypress', event =>{
    if(event.key === 'Enter') {
        const cityName = inputElement.value;
        weatherData(cityName);
        inputElement.value = ''      
    }
})


const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function weatherData(city){
    const response = await fetch(url + city + "&appid=" + 'f539615912756027740413fd9f6f6d66');
    const data = await response.json();



    if(data.cod == 404){
        document.querySelector('.weather-info').style = 'display: none';
        error.style = 'display: block'
        error.innerHTML = 'Enter a valid city name'
    }else{
        let weatherIcon = data.weather[0].main;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        cityNameDisplay.innerHTML = data.name;
        cityTemperature.innerHTML = Math.round(data.main.temp) + '°C';
        humidityResult.innerHTML = humidity + '%';
        windSpeed.innerHTML = wind;
        document.querySelector('.weather-info').style = 'display: block'
        error.style = 'display: none'
        if(weatherIcon === 'Clouds'){
            weatherImage.innerHTML = `<img class='weather-image-display' src="images/clouds.png" alt="">`;
        } 
        else if(weatherIcon === 'Clear'){
            weatherImage.innerHTML = `<img class='weather-image-display' src="images/clear.png" alt="">`
        }
        else if(weatherIcon === 'Drizzle'){
            weatherImage.innerHTML = `<img class='weather-image-display' src="images/drizzle.png" alt="">`
        }
        else if(weatherIcon === 'Mist'){
            weatherImage.innerHTML = `<img class='weather-image-display' src="images/mist.png" alt="">`
        }
        else if(weatherIcon === 'Snow'){
            weatherImage.innerHTML = `<img class='weather-image-display' src="images/snow.png" alt="">`
        }
        else if(weatherIcon === 'Rain'){
            weatherImage.innerHTML = `<img class='weather-image-display' src="images/rain.png" alt="">`
        }
    }


}