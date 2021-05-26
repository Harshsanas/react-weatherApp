import axios from "axios";
import React, { useState } from "react";
const api_keys = {
  key: "47516d439dc34bae327a6920ae8ff2aa",
  base_url: "https //api.openweathermap.org/data/2.5/",
};

function Main() {
  const [weather, setWeather] = useState({});
  const [data, setData] = useState("");

  const search = (el) => {
    if (el.key === "Enter") {
      alert("working");
      axios
        .get(
          `${api_keys.base_url}weather?q=${data}&units=metric&APPID=${api_keys.key}`
        )
        .then((result) => {
          setData("");
          setWeather(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(api_keys.base_url);
    }
  };
  const dateBuilder = (e) => {
    let months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    let days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    let day = days[e.getDay()];
    let date = e.getDate();

    let month = months[e.getMonth()];
    let year = e.getYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <nav>
      <div className="searchbox">
        <input
          onChange={(e) => setData(e.target.value)}
          type="text"
          value={data}
          onKeyPress={search}
          className="searchbar"
          placeholder="Search..."
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="locationbox">
            <div className="location">
              {weather.name},{weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weatherbox">
            <div className="temp">{Math.round(weather.main.temp)}</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Main;
