//global variables
const nameOfCity = document.querySelector(".cityName");
const clouds = document.querySelector(".clouds");
const temperatureHi = document.querySelector(".temperatureHi");
const temperatureLow = document.querySelector(".temperatureLow");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const UVIndex = document.querySelector(".UVI");
const searchResult = document.querySelector("input");
const searchBtn = document.querySelector(".magnifying");
const infoBox = document.querySelector(".info");
const webTitle = document.querySelector(".webTitle");
const historyList = document.querySelector(".hisLis");

const APIKey = "c9648bd67b02cb074a8cff7f4418e8ec";
//variables for the api link
let lat = "";
let lon = "";
let part = "";
let city = "";

function reset() {
  infoBox.remove("noneLi");
}
searchBtn.addEventListener("click", function () {
  //gets value of what is typed in search-bar and
  city = searchResult.value;
  nameOfCity.innerHTML = `Weather in ${searchResult.value}`;
  cityName.fetchCity();
  history(event, city);
  //dynamic title that changes with the city
  webTitle.textContent = `${city} | My Weather `;
});
//saves whatever data is searched into an array in local storage
function history(event, location) {
  event.preventDefault();
  let historyStorage = JSON.parse(localStorage.getItem("history")) || [];
  historyStorage.push(location);
  localStorage.setItem("history", JSON.stringify(historyStorage));
}

//turns a city name into lat and lon for other function to read
let cityName = {
  fetchCity: function () {
    let geoTranslate = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;
    fetch(geoTranslate)
      .then((response) => response.json())
      .then((data) => {
        (lat = data[0].lat), (lon = data[0].lon);
      })
      .then(weather.fetchWeather);
  },
};
//gets weather info for a city
let weather = {
  fetchWeather: function () {
    let weatherLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    fetch(weatherLink)
      .then((response) => response.json())
      // adding data to page
      .then(function (data) {
        //loops to create ul for each day
        let days = data.daily;
        for (let i = 0; i < 5; i++) {
          const ul = document.createElement("ul");
          ul.classList.add("noneLi");
          infoBox.appendChild(ul);
          const cloudsLi = document.createElement("li");
          cloudsLi.classList.add("clouds");
          cloudsLi.innerHTML = "Condition: " + days[i].weather[0].description;
          //creates li for all of the data for each day
          const temperatureHiLi = document.createElement("li");
          temperatureHiLi.classList.add("temperatureHi");
          temperatureHiLi.innerHTML =
            "Temperature High: " + days[i].temp.max + "°";

          const temperatureLowLi = document.createElement("li");
          temperatureLowLi.classList.add("temperatureLow");
          temperatureLowLi.innerHTML =
            "Temperature Low: " + days[i].temp.min + "°";

          const humidityLi = document.createElement("li");
          humidityLi.classList.add("humidity");
          humidityLi.innerHTML = "Humidity: " + days[i].humidity;

          const windSpeedLi = document.createElement("li");
          windSpeedLi.classList.add("windSpeed");
          windSpeedLi.innerHTML = "Wind Speed: " + days[i].wind_speed;

          const UVILi = document.createElement("li");
          UVILi.classList.add("UVI");
          UVILi.innerHTML = "UV index: " + days[i].uvi;
          //adds the newly made lists to the ul
          ul.append(
            cloudsLi,
            temperatureHiLi,
            temperatureLowLi,
            humidityLi,
            windSpeedLi,
            UVILi
          );
        }
      });
  },
};

document.getElementById("hisLis").innerHTML += localStorage.getItem("history");
