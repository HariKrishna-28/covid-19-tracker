import React from 'react'
import '../styles/Table.css'
import numeral from 'numeral'

const Table = ({ countries, changeGraph }) => {
    return (
        <div className="table">
            <table>
                {/* {console.log(countries)} */}
                <tbody>
                    {countries.map((country, index) => (
                        <tr
                            onClick={(e) => {
                                changeGraph(country.countryInfo.iso2)
                                console.log(country.countryInfo.iso2)
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
