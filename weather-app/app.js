const apiKey = config.WEATHER_API_KEY;

let long;
let lat;
const temperatureDescription = document.querySelector(
  ".temperature-description"
);
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const temperatureSection = document.querySelector(".temperature-section");
const temperatureSectionSpan = document.querySelector(".scale");

function display(event) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const location = document.querySelector(".location");
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.current;
          const { description, icon } = data.current.weather[0];

          //Update DOM elements from API.
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.timezone;

          //set icon.
          location.appendChild(setIconImage(icon));

          //change temp scales.
          temperatureSection.addEventListener("click", (tempClickEvent) =>
            changeTemperatureScale(tempClickEvent, temp)
          );
        });
    });
  }
}

function setIconImage(icon) {
  const iconApi = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  let img = document.createElement("img");
  img.src = iconApi;

  return img;
}

function changeTemperatureScale(tempClickEvent, temp) {
  {
    if (temperatureSectionSpan.textContent === "F") {
      temperatureSectionSpan.textContent = "C";
      temperatureDegree.textContent = ((temp - 32) * (5 / 9)).toFixed(1);
    } else {
      temperatureSectionSpan.textContent = "F";
      temperatureDegree.textContent = temp;
    }
  }
}

window.addEventListener("load", display);
