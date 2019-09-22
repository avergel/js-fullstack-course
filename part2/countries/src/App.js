import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [countriesFiltered, setCountriesFiltered] = useState([])
    const [filter, setFilter] = useState('')

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data
                    .map(c => (
                        {
                            name: c.name,
                            capital: c.capital,
                            population: c.population,
                            languages: c.languages,
                            flag: c.flag
                        })))
            })
    }

    useEffect(hook, [])

    const handleShowCountry = (country) => {
        setCountriesFiltered([country])
    }

    const handleFilter = (event) => {
        const newFilter = event.target.value
        setFilter(newFilter)
        if (newFilter === '') {
            setCountriesFiltered([])
        } else {
            setCountriesFiltered(countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase())))
        }
    }



    return (
        <div>
            <p>find countries <input value={filter} onChange={handleFilter} /></p>
            <Countries countries = {countriesFiltered} showFunction={handleShowCountry} />
        </div>
    )
}

export default App