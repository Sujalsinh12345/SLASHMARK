document.getElementById('searchButton').addEventListener('click', getWeather);

function getWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '13ca0c89d8cd04873921fbc32a542965'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                document.getElementById('weatherDetails').textContent = 'City not found. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('weatherDetails').textContent = 'Error fetching the weather data. Please try again.';
        });
}

function displayWeather(data) {
    const weatherDetails = `
        <p>City: ${data.name}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherDetails').innerHTML = weatherDetails;
}
