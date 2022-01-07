import React from 'react'
import '../styles/Table.css'
import numeral from 'numeral'

const Table = ({ countries }) => {
    return (
        <div className="table">
            {countries.map(({ country, cases }, key) => (
                <tr
                    key={key}>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format()}</strong></td>
                </tr>
            ))}

        </div>
    )
}

export default Table
