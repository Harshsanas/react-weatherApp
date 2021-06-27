import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const FOOTER = styled.div`
  bottom: 0;
  position: fixed;
  width: 100%;
  color: blanchedalmond;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  text-shadow: 2px 2px rgba(50, 50, 70, 0.5);
`;

const token = "47516d439dc34bae327a6920ae8ff2aa";

export default function Main() {
  const [weather, setWeather] = useState([]);
  const [input, setInput] = useState("");

  const search = (el) => {
    if (el.key === "Enter") {
      console.log(token,input);
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${token}`
      ).then(res=>{
        setWeather(res.data)
        console.log(res.data);
      }).catch(err=> {
        console.log(err.message);
      });
    }}

    

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
    <div>
      <nav>
        <div className="searchbox">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            value={input}
            onKeyPress={search}
            className="searchbar"
            placeholder="Enter City Name"
            style={{textAlign:"center"}}
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
              <div className="temp">{Math.round(weather.main.temp)-273}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}

        <FOOTER>
          <h2>REACT WEATHER APP - BY HARSHIT</h2>
        </FOOTER>
      </nav>
    </div>
  );
}