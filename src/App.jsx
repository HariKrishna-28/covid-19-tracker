import { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import './App.css';
import { InfoBox, Map, Table, LineGraph } from './components';
import { sortData, prettyPrintStat } from './helpers/util'
import 'leaflet/dist/leaflet.css'
import numeral from 'numeral';


function App() {

  const [country, setInputCountry] = useState("worldwide")
  // const [name, setName] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [countries, setCountries] = useState([])
  const [mapCountries, setMapCountries] = useState([])
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState("cases")
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          let sortedData = sortData(data)
          setCountries(countries)
          setMapCountries(data)
          setTableData(sortedData)
        });
    };

    getCountriesData()
  }, [])


  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode)
        setCountryInfo(data)
        try {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        } catch (err) {
          setMapCenter({ lat: 34.80746, lng: -40.4796 })
        }
        setMapZoom(4);
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            {/* {console.log(country)} */}
          </div>
        </CardContent>
        <h3>{casesType} {country !== "worldwide" ? "in" : null} {country}</h3>
        <LineGraph countryCode={country} casesType={casesType} />
      </Card>
    </div>
  )
}

export default App;