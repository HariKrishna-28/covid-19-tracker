import React, { useState } from 'react'
import '../styles/Table.css'
import numeral from 'numeral'
import CountUp from 'react-countup';


const Table = ({ countries, changeGraph, changeCoordinates }) => {
    const [countUp, setCountUp] = useState(false)
    return (
        <div className="table">
            <table>
                <tbody>
                    {countries.map((country, index) => (
                        <tr
                            onClick={(e) => {
                                changeGraph(country.countryInfo.iso2)
                                changeCoordinates(country.countryInfo.lat, country.countryInfo.long)
                            }}
                            key={index}>
                            <td>{country.country}</td>
                            {/* <td><strong>{numeral(country.cases).format()}</strong></td> */}
                            {!countUp &&
                                <td><strong><CountUp end={country.cases} duration={1} onEnd={() => setCountUp(true)} /></strong></td>
                            }
                            {countUp &&
                                <td><strong>{numeral(country.cases).format()}</strong></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Table
