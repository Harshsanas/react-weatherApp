import axios from "axios";
import React, { useState } from "react";

function Main() {
  const [weather, setWeather] = useState({});
  const [data, setData] = useState("");

  const search = (el) => {
    if (el.key === "Enter") {
      alert("working");
      axios
        .get(
          `api.openweathermap.org/data/2.5/weather?q=${data}&appid=47516d439dc34bae327a6920ae8ff2aa`
        )
        .then((result) => {
          console.log(result);
          setWeather(result.data);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(data);
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
