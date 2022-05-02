// Initiliaze required DOM elements

const weatherApp = document.querySelector(".weather-app");
const locationManualInput = document.querySelector(".city-input");
const locationButtonInput = document.querySelector(".device-location .location");
const errorEl = document.querySelector(".error-message");
const locationCity = document.querySelector(".city-details .city-name");
const humidityPercentage = document.querySelector(".humidity-temp");
const temperature = document.querySelector(".temperature");
const goBack = document.querySelector(".go-back");
const summary = document.querySelector(".summary");
const feelsLike = document.querySelector(".feels-like-temp");
const weatherIcon = document.querySelector(".weather-icon img");
const APIkey = "7e4a75626b2fb3f369183c97d778d71b";

locationManualInput.addEventListener("keyup", (e) => {
    if(locationManualInput.value !== "" && e.key === "Enter") {
        requestApi(locationManualInput.value);
    }
})

locationButtonInput.addEventListener("click", (e) => {
    if(navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition(onSuccess,onError));
    } else {
        console.log("Browser does not support location");
    }
})

async function onSuccess(success) {
    errorEl.classList.remove("active");
    const {latitude, longitude} = success.coords;
    console.log("Longitude: ",success.coords.longitude);
    console.log("Latitude: ",success.coords.longitude);
    weatherApp.classList.remove("input-mode");
    weatherApp.classList.add("result-mode");
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`; 
    const fetchAPI = await fetch(apiURL);
    const results = await fetchAPI.json();
    locationCity.innerText = results.name;
    console.log("Result from browser detection", results);
    displayResults(results);
}

function onError(error) {
    errorEl.innerText = error.message;
    errorEl.classList.add("active")
    console.log(error.message);
}

const requestApi = async (city) => {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
    const fetchAPI = await fetch(apiURL);
    const results = await fetchAPI.json();

    if(results.message == "city not found") {
        errorEl.innerText = "Please enter correct city name";
        errorEl.classList.add("active");
    } else {
        errorEl.classList.remove("active");
        weatherApp.classList.remove("input-mode");
        weatherApp.classList.add("result-mode");
        displayResults(results);
    }
}

const displayResults = (results) => {
    console.log("Displaying results", results);
    humidityPercentage.innerText = `${results.main.humidity}%`;
    locationCity.innerText = `${results.name}, ${results.sys.country}`;
    summary.innerText = results.weather[0].description;
    temperature.innerText = `${Math.ceil(results.main.temp)}°C`;
    feelsLike.innerText = `${Math.ceil(results.main.feels_like)}°C`
    const id = results.id;
    console.log(results.weather[0].icon);

    if(id>200&&id<300) {
        weatherIcon.setAttribute("src", "img/15.png");
    }
    else if(id>300&&id<500) {
        weatherIcon.setAttribute("src", "img/1.png");
    }
    else if(id>500&&id<600) {
        weatherIcon.setAttribute("src", "img/14.png")
    }
    else if(id>600&&id<700) {
        weatherIcon.setAttribute("src", "img/9.png")
    }
    else if(id>700&&id<800) {
        weatherIcon.setAttribute("src", "img/18.png")
    }
    else if(id==800) {
        weatherIcon.setAttribute("src", "img/8.png")
    }
    else if(id>800) {
        weatherIcon.setAttribute("src", "img/5.png")
    }
    
}

// Implement go back functionality

goBack.addEventListener("click", () => {
    weatherApp.classList.replace("result-mode", "input-mode");
})