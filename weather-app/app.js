window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temperature-description");
  let tempDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=3d6312c39356f4206a804e00960992c1`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.current;
          const { description } = data.current.weather[0];

          //Update DOM elements from API.
          tempDegree.textContent = temp;
          tempDescription.textContent = description;
          locationTimezone = data.timezone;
        });
    });
  }
});
