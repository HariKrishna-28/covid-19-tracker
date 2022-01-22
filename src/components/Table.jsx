import React from 'react'
import '../styles/Table.css'
import numeral from 'numeral'

const Table = ({ countries, changeGraph, changeCoordinates }) => {
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
                            <td><strong>{numeral(country.cases).format()}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Table
