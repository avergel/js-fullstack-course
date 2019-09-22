import React from 'react'

const Country = ({ country }) => {
    if (Object.entries(country).length === 0) {
        return null
    } else {
        return (
            <div key={country.name}>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h3>languages</h3>
                <ul>
                    {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
                </ul>
                <img alt={country.name + ' flag'} src={country.flag} style={{ height: '100px' }}></img>
            </div>

        )
    }
}

export default Country