import "./App.css";
import NavBar from "./Components/NavBar.js";
import { useState, useEffect } from "react";
import Map from "./Components/Map.js";
import All from "./Components/All";
import LineChart from "./Components/GlobalChart";
import VerticalBar from "./Components/CountryCharts";
import DoughnutChart from "./Components/DonutChart";
import Vb from "./Components/VaccineChart";
import Bars_2 from "./Components/Vacc2";

function App() {
  const [mapData, setmapData] = useState([]);
  const [chartData, setchartData] = useState(null);
  const [loading, setloading] = useState(true);
  const [isError, setisError] = useState(false);
  const [chartCountries, setchartCountries] = useState([]);
  const [allData, setallData] = useState({});
  const [allCountries, setallCountries] = useState([]);
  const [vaccData, setvaccData] = useState([]);
  const [vaccAll, setvaccAll] = useState([]);

  const updateChartByCountry = async (choosenCountry) => {
    setloading(true);
    const res = await fetch(
      `https://disease.sh/v3/covid-19/historical/${choosenCountry}`
    );
    const data = await res.json();

    setchartData(choosenCountry == "all" ? data : data.timeline);
    var countryData = await fetch(
      `https://disease.sh/v3/covid-19/countries/${choosenCountry}`
    );
    countryData = await countryData.json();
    var vaccCountry = await fetch(
      `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${choosenCountry}`
    );
    vaccCountry = await vaccCountry.json();
    setvaccData(vaccCountry.timeline);

    setallData({
      cases: countryData.cases,
      recovered: countryData.recovered,
      deaths: countryData.deaths,
    });
    setloading(false);
  };
  const fetchData = async () => {
    try {
      var countriesData = await fetch(
        "https://disease.sh/v3/covid-19/countries"
      );
      countriesData = await countriesData.json();

      //var countries = Object.values(countriesData.country);
      var allData = await fetch(
        "https://disease.sh/v3/covid-19/historical/all"
      );
      allData = await allData.json();
      var all = await fetch("https://disease.sh/v3/covid-19/all");
      all = await all.json();
      var vaccData = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage"
      );
      vaccData = await vaccData.json();
      var vaccAll = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage/countries"
      );
      vaccAll = await vaccAll.json();
      return [countriesData, allData, all, vaccData, vaccAll, null];
    } catch (e) {
      return [null, null, null, null, null, null, e];
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setmapData(
          data[0].map((e) => {
            return { country: e.countryInfo?.iso2, value: e.cases };
          })
        );
        setallCountries(data[0].map((e) => ({ country: e.country })));

        setchartCountries(
          data[0].map((e) => {
            return {
              country: e.country,
              cases: e.cases,
              recovered: e.recovered,
              deaths: e.deaths,
            };
          })
        );
        setchartData(data[1]);
        setallData({
          deaths: data[2].deaths,
          recovered: data[2].recovered,
          cases: data[2].cases,
        });
        setvaccData(data[3]);
        setvaccAll(data[4]);
        setisError(false);
        setloading(false);
      })
      .catch((e) => {
        console.log(e);
        setisError(true);
        setloading(false);
      });
  }, []);
  return (
    <div className="myPage">
      <NavBar
        allCountries={allCountries}
        updateChartByCountry={updateChartByCountry}
      />
      {loading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Une erreur s'est produite</h1>
      ) : (
        <>
          {" "}
          <div className="content">
            <All allData={allData} />
            <Map mapData={mapData}></Map>
          </div>
          <div className="charts">
            <div className="lines">
              <LineChart chartData={chartData} />
            </div>
            <div className="bars">
              <VerticalBar chartCountries={chartCountries}></VerticalBar>{" "}
            </div>

            <div className="donut">
              {" "}
              <DoughnutChart allData={allData}></DoughnutChart>
            </div>
            <div className="lines">
              <Vb chartData={vaccData}></Vb>
            </div>
            <div className="bars">
              <Bars_2 chartCountries={vaccAll}></Bars_2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
