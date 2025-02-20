let today = document.getElementById("today");
let week = document.getElementById("week");

var latitude;
var longitude;
let apikey = "154aa88640999904a27ad3a3156810e0";

today.addEventListener("click", () => {
  document.getElementById("div2sec1").style.display = "block";
  document.getElementById("div3").style.display = "none";
  today.style.color = "black";
  today.style.border = "3px solid black";
  today.style.borderTopStyle = "none";
  today.style.borderLeftStyle = "none";
  today.style.borderRightStyle = "none";
  week.style.color = "gray";
  week.style.borderBottomStyle = "none";
});
week.addEventListener("click", () => {
  document.getElementById("div2sec1").style.display = "none";
  document.getElementById("div3").style.display = "block";
  week.style.color = "black";
  week.style.border = "3px solid black";
  week.style.borderTopStyle = "none";
  week.style.borderLeftStyle = "none";
  week.style.borderRightStyle = "none";
  today.style.color = "gray";
  today.style.borderBottomStyle = "none";
});

let search = document.getElementById("search");
search.addEventListener("click", () => {
  let city = document.getElementById("div1place").value;
  

  let res = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`
  );

  res
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      latitude=data.city.coord.lat;
      longitude=data.city.coord.lon;
      let datacity = data.city.name;
      document.getElementById("city").textContent = datacity;
      document.getElementById("imgcity").innerText =
        datacity + "," + data.city.country;
      let dayname = document.getElementById("div1h3");
      const forecast = data.list[0];
      document.getElementById("div1h1").innerHTML = 
        `<h1 id="div1h1">
          ${Math.round(forecast.main.temp - 273.15)}
          <sup>oC</sup>
        </h1>`
      ;
      const iconcode = forecast.weather[0].icon;
      
      document.getElementById("divimage").src=`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        document.getElementById("div1h41").innerHTML=`<h4 id="div1h41">${forecast.weather[0].description}</h4>`
        document.getElementById("div1h42").innerHTML=`<h4 id="div1h42">${forecast.pop * 100} %</h4>`
      let timestamp = data.list[0].dt;
      let date = new Date(timestamp * 1000);
      let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      document.getElementById("div1h3").textContent = dayName;
      document.getElementById("date").innerHTML=`<span id="date">${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</span>`;

      document.getElementById("date").style.marginLeft="-0px";
      document.getElementById("date").style.marginTop="-0px";
      document.getElementById("deg").innerHTML=`<h1 id="deg">${Math.round(forecast.main.temp - 273.15)}<sup>o</sup></h1>`
      document.getElementById("weather").innerHTML=`<h2 id="weather">${forecast.weather[0].description}</h2>`;
      document.getElementById("wind").innerHTML=`<span id="wind">Wind Speed : ${ forecast.wind.speed} m/s</span>`;
      document.getElementById("wind").style.marginLeft="0%";
      document.getElementById("humi").innerHTML=`<span id="humi">Humidity : ${forecast.main.humidity} %</span>`;
      document.getElementById("humi").style.marginLeft="0%";
      document.getElementById("rainchance2").innerHTML=`<p id="rainchance2">${forecast.pop * 100} %</p>`;
      document.getElementById("speed").innerHTML=`<p id="speed">${ forecast.wind.speed} m/s</p>`;
      document.getElementById("winddeg").innerHTML=`<p id="winddeg">${ forecast.wind.deg} <sup>o</sup></p>`;
      document.getElementById("humiditypercent").innerHTML=`<p id="humiditypercent">${forecast.main.humidity} %</p>`

      const  sunrise = data.city.sunrise;
      const sunset = data.city.sunset;
      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
      console.log(sunriseTime);
      console.log(sunsetTime);
      document.getElementById("sunrisetime").innerHTML=`<span id="sumrisetime">${sunriseTime}</span>`;
      document.getElementById("sunsettime").innerHTML=`<span id="sunsettime">${sunsetTime}</span>`;

      let visibility = forecast.visibility/1000;
      document.getElementById("km").innerHTML=`<p id="km">${visibility} km</p>`;


      let dailyForecast = {};

      // Loop through the forecast data (every 3 hours)
      data.list.forEach((item) => {
        let date = new Date(item.dt * 1000);
        let dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        // Store only one forecast per day (pick the first occurrence)
        if (!dailyForecast[dayName]) {
          dailyForecast[dayName] = item;
        }
      });

      // Convert daily forecast object to an array and display results
      Object.keys(dailyForecast).slice(0, 5).forEach((day) => {
        let forecast = dailyForecast[day];
        let temp = Math.round(forecast.main.temp - 273.15); // Convert Kelvin to Celsius
        let icon = forecast.weather[0].icon;
        let description = forecast.weather[0].description;

        // Create HTML elements
        let div3 = document.getElementById("daywise");

        let forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastCard.style.border="1px solid black";
        // forecastCard.style.padding = "5px";
        forecastCard.style. borderRadius="9px";
        forecastCard.style.marginLeft="-7%";
        forecastCard.style.height="150px";
        forecastCard.style.backgroundColor="aliceblue"
        forecastCard.style.textAlign="center";

        forecastCard.innerHTML = `
          <h3>${day}</h3>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
          <p>${temp}°C</p>
        `;

        // Append to the forecast container
        div3.appendChild(forecastCard);
      });



    })
    .catch((data) => {
      console.log("error");
    });
});


let search1 = document.getElementById("search");
search1.addEventListener("click", () => {
  let city = document.getElementById("div1place").value;

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      latitude = data.city.coord.lat;
      longitude = data.city.coord.lon;

      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
        .then((response) => response.json())
        .then((airData) => {
          const aqi = airData.list[0].main.aqi; // Fix: Corrected `api` to `aqi`
          const airQualityLevels = ["Good 😊", "Fair 🙂", "Moderate 😐", "Poor 😷", "Very Poor 🤢"];
          const airQuality = airQualityLevels[aqi - 1];

          console.log("Air Quality Index:", aqi);
          console.log("Air Quality Level:", airQuality);

          document.getElementById("airqua").innerHTML=`<p id="airqua">${aqi}</p>`;
          document.getElementById("airquadesc").innerHTML=`<p id="airquadesc">${airQuality}</p>`

        })
        .catch(() => {
          console.log("Air quality data not fetched");
        });

    })
    .catch(() => {
      console.log("Error fetching weather data");
    });
});



