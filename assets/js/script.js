document.querySelector(".clickme").addEventListener("click", () => {
    GetInfo();
});

function GetInfo() {
    const cityInput = document.querySelector("#cityInput").value;
    const cityName = document.querySelector("#cityName");
    cityName.innerHTML = cityInput;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=879fcd7a229d308d37f2d6f92cde5fbf`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherContainer = document.querySelector("#weatherContainer");
            weatherContainer.innerHTML = "";

            // Filter the data to get the first forecast for each day
            const dayData = data.list.filter((item, index) => index % 8 === 0);

            for (let i = 0; i < 5; i++) {
                const dayCard = createWeatherCard(i + 1, dayData[i]);
                weatherContainer.appendChild(dayCard);
            }
        })
        .catch(err => {
            if(cityInput == "" || !cityInput.value){
            document.querySelector("#error-message").innerHTML = `You have entered wrong city name`;
            }
        });
}

function createWeatherCard(day, dayData) {
    const card = document.createElement("div");
    card.classList.add("icons");

    const date = new Date(dayData.dt * 1000); // Convert UNIX timestamp to Date object
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Format the date

    card.innerHTML = `
        <p class="dates" id="day${day}date">${formattedDate}</p>
        <p class="Climate" id="day${day}Climate">Loading...</p>
        <div class="image">
            <img src="https://placehold.co/100x100/EEE/31343C" class="imgClass" id="img${day}" />
        </div>
        <p class="Temperature" id="day${day}Temperature">Loading...</p>
        <p class="windspeed" id="day${day}"></p>
    `;

    card.querySelector(`#day${day}Climate`).innerHTML = `Climate: ${dayData.weather[0].description}`;
    card.querySelector(`#day${day}Temperature`).innerHTML = `Temperature: ${Number(dayData.main.temp - 273.15).toFixed(1)}°C`;
    card.querySelector(`#day${day}`).innerHTML = `Wind Speed: ${dayData.wind.speed} km/h`;
    card.querySelector(`#img${day}`).src = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

    return card;
}