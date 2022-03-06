const nameOfCity = document.querySelector(".cityName");
const clouds = document.querySelector(".clouds");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const UVIndex = document.querySelector(".UVI");
const searchResult = document.querySelector("input")
const searchBtn = document.querySelector(".magnifying")

const APIKey = "c9648bd67b02cb074a8cff7f4418e8ec"
let lat = ""
let lon = ""
let part = ""
let city = ""
// https://openweathermap.org/api/one-call-api#how

searchBtn.addEventListener("click", function(){
    city = searchResult.value
    nameOfCity.innerHTML = `Weather in ${searchResult.value}`
    cityName.fetchCity()
}) 
  
let cityName = {
    fetchCity: function() {
        let geoTranslate = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
        fetch(geoTranslate)
        .then((response) => response.json())
        .then((data) => {lat = (data[0].lat),lon = (data[0].lon)}) 
        .then(weather.fetchWeather)
    }
}

let weather = {
    fetchWeather: function() {
    let weatherLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(weatherLink)
    .then((response) => response.json())
    // adding data to page
    .then(function (data) {
        
    })
        



}
}


