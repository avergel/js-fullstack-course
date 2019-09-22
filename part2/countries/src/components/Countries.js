import React from 'react'
import Country from './Country'
const Countries = ({ countries, showFunction }) => {
    if (countries.length === 0) {
        return null
    }
    if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    }
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    return (
        <div>
            {countries.map(c =>
                <p key={c.name}>{c.name}<button onClick={() => showFunction(c)}>show</button></p>)}
        </div>
    )
}

export default Countries