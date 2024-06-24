import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("")
  const [weather , setWeather] = useState()

  const handleSubmit = (event) => {
    console.log(city);
    event.preventDefault();
    setCity("");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5c8103de264b05d391ac434358211b93&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if(finalRes.cod == "404" || finalRes.cod == "400"){
          setWeather(undefined)
        }
        else{
          setWeather(finalRes)
        }
      });
  };

  return (
    <>
      <div className="fifty">
        <h1>Simple Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Citi Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="fifty center">
        <div id="data">
          {(weather)!== undefined ?
          <><div style={{display: "flex"}}>
          <h2 style={{paddingRight: '1vw'}}>{weather.name}</h2><h2 style={{color:"red"}}> {weather.sys.country}</h2>
        </div>
        <h3>{weather.main.temp} °C</h3>
        <h3>{weather.weather[0].description}</h3>
        <h3>humidity : {weather.main.humidity}</h3></> :
        "No Data Found"}
        </div>
      </div>
    </>
  );
}

export default App;
