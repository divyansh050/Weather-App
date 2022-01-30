getWeather();

async function getWeather() {
  let city;
  try {
    city = document.getElementById("city").value || "India";
    console.log(city);

    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}-->5days
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}-->16days
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=fe1ec66c0e5347deb8372802220601&q=${city}&days=5&aqi=yes&alerts=no`
    );

    //   http://api.weatherapi.com/v1/forecast.json?key=fe1ec66c0e5347deb8372802220601&q=${city}&days=5&aqi=no&alerts=no

    //   https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

    // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,&appid=e554ee2bb9089658028407814cb72eea&units=metric -->  openweather

    // http://api.weatherapi.com/v1/forecast.json?key=fe1ec66c0e5347deb8372802220601&q=London&days=7&aqi=no&alerts=no  --> weatherapi.com

    let data = await response.json();
    console.log(data);
    let lat = data.location.lat;
    let lon = data.location.lon;

    console.log(lat, lon);

    let data7 = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=7days&appid=e554ee2bb9089658028407814cb72eea&units=metric`
    );

    //   &exclude=hourly,minutely,

    let res = await data7.json();

    console.log(res);
    showWeather(data, res);
  } catch (err) {
    console.log(err);
  }

  let map = document.querySelector(".mapInfo");
  map.innerHTML = null;
  map.innerHTML = `<iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" ></iframe>`;
}

// key press
function Key(event) {
  // console.log(event)
  if (event.key === "Enter") {
    getWeather();
  }
}

function showWeather(weather, data7) {
  // background image change according to the weather or day night condition
  // "url('https://wallpapercave.com/wp/wp5384153.jpg')";
  if (weather.current.is_day == 0) {
    if (data7.daily[0].weather[0].main == "Rain") {
      document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80')";
      document.body.style.color = "#ccc";
    } else if (data7.daily[0].weather[0].main == "Clouds") {
      document.body.style.backgroundImage =
        "url('https://img5.goodfon.com/wallpaper/nbig/e/e6/noch-doroga-tuchi.jpg')";
      document.body.style.color = "#ccc";
    } else if (data7.daily[0].weather[0].main == "Snow") {
      document.body.style.backgroundImage = "url('./images/night/snow.jpg')";
      document.body.style.color = "#cccccc";
    } else if (data7.daily[0].weather[0].main == "Clear") {
      document.body.style.backgroundImage =
        "url('https://wallpapercave.com/wp/wp5384153.jpg')";
      document.body.style.color = "#ccc";
    }
  } else {
    if (data7.daily[0].weather[0].main == "Rain") {
      document.body.style.backgroundImage =
        "url('https://867688.smushcdn.com/2058515/wp-content/uploads/2020/07/Blog-Heavy-Rain-Be-on-the-Lookout-for-Heavy-Damage.jpg?lossy=1&strip=1&webp=1')";
      document.body.style.color = "black";
    } else if (data7.daily[0].weather[0].main == "Clouds") {
      document.body.style.backgroundImage = "url('./images/day/clouds.jpg')";
      document.body.style.color = "#ccc";
    } else if (data7.daily[0].weather[0].main == "Snow") {
      document.body.style.backgroundImage = "url('./images/day/snow.jpg')";
      document.body.style.color = "black";
    } else if (data7.daily[0].weather[0].main == "Clear") {
      document.body.style.backgroundImage = "url('./images/day/clear.jpg')";
      document.body.style.color = "#cccccc";
    }
  }

  // all info part change here
  let city = document.querySelector(".city");
  city.innerText = weather.location.name;

  let region = document.querySelector("#region");
  region.innerText = weather.location.region;

  let country = document.querySelector("#country");
  country.innerText = weather.location.country + ", ";

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${weather.current.temp_c}<sup>&#8451</sup>`;

  let feelsLike = document.querySelector(".feelsLike");
  feelsLike.innerHTML = `${weather.current.temp_c}<sup>&#8451</sup>`;

  let maxMin = document.querySelector(".maxMin");
  maxMin.innerHTML = `${data7.daily[0].temp.max}<sup>&#8451</sup> / ${data7.daily[0].temp.min}<sup>&#8451</sup>`;

  let windSpeedDir = document.querySelector(".windSpeed");
  windSpeedDir.innerHTML = `${data7.daily[0].wind_speed}km / <spam>${weather.current.wind_dir}</spam>`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${weather.current.humidity} %`;

  let airQlty = document.querySelector(".airQlty");
  airQlty.innerText = weather.current.air_quality.pm2_5.toFixed(2) + " µg/m³";

  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = `${weather.current.pressure_in} Hg`;

  let visibility = document.querySelector(".visibility");
  visibility.innerHTML = `${weather.current.vis_km} km`;

  let sunRise_sunSet = document.querySelector(".setRise");
  sunRise_sunSet.innerHTML =
    weather.forecast.forecastday[0].astro.sunrise +
    " / " +
    weather.forecast.forecastday[0].astro.sunset;

  let uv = document.querySelector(".uv");
  uv.innerText = weather.forecast.forecastday[0].day.uv;

  let lastUpdate = document.querySelector(".lastUpdate");
  lastUpdate.innerText = weather.current.last_updated;

  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img  src='${weather.current.condition.icon}'/>`;

  let status = document.querySelector(".status");
  status.innerHTML = `${data7.daily[0].weather[0].main} / ${weather.current.condition.text}`;

  // date fashion change
  let check = weather.location.localtime;
  let y = check[0] + "" + check[1] + check[2] + check[3];
  let m = check[5] + "" + check[6];
  let d = check[8] + "" + check[9];
  let ext;
  if (check[11] == 1 && check[12] >= 2  || check[11]==2) {
    ext = " PM";
  } else {
    ext = " AM";
  }
  let t;
  if (check[15] != undefined) {
    t = check[11] + "" + check[12] + check[13] + check[14] + check[15] + ext;
  } else {
    t = check[11] + "" + check[12] + check[13] + check[14] + ext;
  }

  if (m == 01) {
    m = "January";
  } else if (m == 02) {
    m = "February";
  } else if (m == 03) {
    m = "March";
  } else if (m == 04) {
    m = "April";
  } else if (m == 05) {
    m = "May";
  } else if (m == 06) {
    m = "June";
  } else if (m == 07) {
    m = "July";
  } else if (m == 08) {
    m = "August";
  } else if (m == 09) {
    m = "September";
  } else if (m == 10) {
    m = "October";
  } else if (m == 11) {
    m = "November";
  } else if (m == 12) {
    m = "December";
  }

  let date = document.querySelector(".date");
  date.innerHTML = `<h3>${m + " " + d + " " + y} ${t}</h3>`;

  // let dt = new Date()
  // console.log(dt.getDate()==d)
  // console.log(dt.getDate()>d)
  // console.log(dt.getDate()<d)
  // console.log(dt.getDate()-'07')
  // console.log(dt.getDate()-'09')
  // console.log(dt.getDay())

  day7(data7.daily, d);

  // here on every search we want user se the info first everytime on search
  // so we add none class in our 7day info div $ remove from the main info div
  document.querySelector(".locationInfo").classList.remove("none");
  document.querySelector(".locationInfo2").classList.add("none");
  document.querySelector(".mapInfo").classList.add("none");
  document.getElementById("btn7").classList.remove("active");
  document.getElementById("mapBtn").classList.remove("active");
}

// onclick on day7 button that shows the data of ext 7 days
// append image according  to the condition
function day7(data7, d) {
  let div = document.querySelector(".locationInfo2");
  div.innerHTML = null;

  // day manage
  // let arr = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  let arr = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let dt = new Date();
  let dt1 = dt.getDate();
  let din = dt.getDay();

  // d --> date of the location
  // dt1 --> date of india
  // din --> index 0f the week day 'india'
  if (d == dt1) {
  } else if (dt1 > d) {
    if (din == 0) {
      din = 6;
    } else {
      din = din - 1;
    }
  } else if (dt1 < d) {
    if (din == 6) {
      din = 0;
    } else {
      din = din + 1;
    }
  }

  let imgData = {
    Rain: "https://cdn-icons-png.flaticon.com/512/1146/1146858.png",
    Clear: "https://cdn-icons-png.flaticon.com/512/890/890347.png",
    Snow: "https://cdn-icons-png.flaticon.com/512/3026/3026312.png",
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
  };

  data7.forEach(function (elem) {
    let con = document.createElement("div");
    let icon;

    if (elem.weather[0].main == "Rain") {
      icon = imgData.Rain;
    } else if (elem.weather[0].main == "Clear") {
      icon = imgData.Clear;
    } else if (elem.weather[0].main == "Snow") {
      icon = imgData.Snow;
    } else if (elem.weather[0].main == "Clouds") {
      icon = imgData.Clouds;
    }

    con.innerHTML = `<h2>${arr[din]}</h2>
<div><p>Max / Min</p>
<p>${elem.temp.max}<sup>&#8451</sup> / ${elem.temp.min}<sup>&#8451</sup></p>
<p>${elem.weather[0].main} / ${elem.weather[0].description}</p></div>
<img src="${icon}"/>`;

    div.appendChild(con);

    if (din == 6) {
      din = 0;
    } else {
      din++;
    }
  });
}

// toggle add and remove class on button click
function toggleInfo() {
  document.querySelector(".locationInfo").classList.toggle("none");
  document.querySelector(".locationInfo2").classList.toggle("none");
  document.getElementById("btn7").classList.toggle("active");
  console.log(document.getElementById("btn7"));
}

// toggle add and remove class on button click for map
function toggleMap() {
  document.querySelector(".locationInfo").classList.toggle("none");
  document.querySelector(".locationInfo2").classList.add("none");
  document.querySelector(".mapInfo").classList.toggle("none");
  document.getElementById("mapBtn").classList.toggle("active");
  console.log(document.getElementById("btn7"));
}

// map

// https://www.embedgooglemap.net/
// map ke liye url lena hai idhar se api hai

//getting device location by default from users device if location is on or ask for location if location is not on and then get location from
// let lat;
// let lon;
// const successCallback = function (position) {
//   initMap(position.coords.latitude, position.coords.longitude);
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
//   // console.log(lat, lon)
//   getWeather();
//   getWeekForcast();
// };
// const errorCallback = function (error) {
//   // console.log(error);
//   //  show the error
// };
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//End of getting device location.
