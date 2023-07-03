let apiKey = "54329t0862d311d98ao03f4ab0b0f9f5";
let apiURL = `https://api.shecodes.io/weather/v1/`;
//   https://api.shecodes.io/weather/v1/current?query=Lisbon&key=54329t0862d311d98ao03f4ab0b0f9f5&units=metric

let now = new Date();
let hour = now.getHours().toString().padStart(2, "0");
let minutes = now.getMinutes().toString().padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
document.querySelector("#day").innerHTML = `${day}`;
document.querySelector("#time").innerHTML = `${hour} : ${minutes}`;

let form = document.querySelector("#submitForm");
function displaySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#inputValue");
  console.log(input.value)
  let inputValue = input.value;
  let urlSearch = `${apiURL}current?query=${inputValue}&units=metric`;

  function showRealTimeData(response) {
    let image = response.data.condition.icon_url;
    document.querySelector("#iconElement").setAttribute("src", `${image}`);
    let temperature = Math.round(response.data.temperature.current);
    console.log(response.data);
    document.querySelector("#tempOutput").textContent = `${temperature}`;
    let description = response.data.condition.description;
    document.querySelector("#description").textContent = `${description}`;
    let humidity = Math.round(response.data.temperature.humidity);
    document.querySelector("#moist").textContent = `${humidity}`;
    let wind = Math.round(response.data.wind.speed);
    document.querySelector("#breeze").textContent = `${wind}`;
    let city = response.data.city;
    let country = response.data.country;
    document.querySelector("#place").textContent = `${city}, ${country}`;
  }
  axios.get(`${urlSearch}&key=${apiKey}`).then(showRealTimeData);
}
let cOutput = 14;
form.addEventListener("submit", displaySearch);
let f = document.querySelector("#fahrenheit");
let c = document.querySelector("#celsius");
let temp = document.querySelector("#tempOutput");

function convertTemp() {
  temp.innerHTML = `${cOutput}`;
}
function convertCensuis() {
  let fOutput = Math.round((cOutput * 9) / 5 + 32);
  temp.innerHTML = `${fOutput}`;
}
c.addEventListener("click", convertTemp);
f.addEventListener("click", convertCensuis);
