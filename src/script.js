function formatDate (date) {

let dayIndex = date.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[dayIndex];

let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

return `${day} ${hour}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = `<div class="col">
          <div class="weather-forecast-date">Mon</div>
          <img src="http://openweathermap.org/img/wn/10d@2x.png" class="forecast-icon" width="36" />
          <div class="weather-forecast-temperature"><span class="weather-forecast-temperature-min">10°</span> | <span
              class="weather-forecast-temperature-max">20°</span></div>
        </div>`;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let temperatureText = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  temperatureText.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity (city) {
  let apiKey ="c205b25a89d4049e74628e901e0f0803";
  let units ="metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit (event) {
event.preventDefault();
let city = document.querySelector ("#search-input").value;
searchCity (city);
}

function searchLocation(position) {
console.log(position);
let apiKey = "c205b25a89d4049e74628e901e0f0803";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
}


function getCurrentPosition (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


function convertToFahrenheit (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature*9/5)+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector ("#search-city");
searchButton.addEventListener("click", handleSubmit);


let currentButton = document.querySelector ("#current-location");
currentButton.addEventListener("click", getCurrentPosition);

let currentDate = document.querySelector("#date");
let currentTime = new Date ();
currentDate.innerHTML = formatDate(currentTime);

searchCity ("New York");