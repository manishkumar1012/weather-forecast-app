const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const addressPara = document.querySelector('#address-para');
const forecastPara = document.querySelector('#forecast-para');

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addressPara.textContent = 'Loading...';
  forecastPara.textContent = '';

  fetch(`http://localhost:3000/weather?location=${searchLocation.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return addressPara.textContent = data.error;
        }
        addressPara.textContent = data.location;
        forecastPara.textContent = data.forecast;
      });
    }
  );
});
