const apiKey = "YOUR_API_KEY_HERE";
let unit = "metric";

function setUnit(selectedUnit) {
  unit = selectedUnit;
  getWeather();
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const temperature = data.main.temp;
    const weather = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const unitSymbol = unit === "metric" ? "°C" : "°F";

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${temperature}${unitSymbol}</p>
      <p>☁ Weather: ${weather}</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬 Wind Speed: ${windSpeed} ${unit === "metric" ? "m/s" : "mph"}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>${error.message}</p>`;
  }
}
