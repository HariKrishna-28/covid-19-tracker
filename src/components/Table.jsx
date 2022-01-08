import React from 'react'
import '../styles/Table.css'
import numeral from 'numeral'

const Table = ({ countries }) => {
    return (
        <div className="table">
            <table>
                <tbody>
                    {countries.map(({ country, cases }, index) => (
                        <tr
                            key={index}>
                            <td>{country}</td>
                            <td><strong>{numeral(cases).format()}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Table
