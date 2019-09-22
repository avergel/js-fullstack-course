import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [messageClass, setMessageClass] = useState(null)

    const refreshPersons = () => {
        personService
            .getAll()
            .then(response => {
                setPersons(response)
            })
            .catch(error => {
                alert('the operation couldn\'t be executed')
                console.error(error)
            })
    }

    useEffect(() => {
        refreshPersons()
    }, [])

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }
    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleAddPerson = (event) => {
        event.preventDefault()
        const existing = persons.filter(p => p.name === newName)
        if (existing.length > 0) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update({ ...existing[0], number: newNumber })
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                        setMessage(`${returnedPerson.name}'s number replaced`)
                        setMessageClass('info')
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setMessage('the operation couldn\'t be executed')
                        setMessageClass('error')
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        console.error(error)
                    })
                setNewName('')
                setNewNumber('')
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            personService
                .create(newPerson)
                .then(personAdded => {
                    console.log(personAdded)
                    setPersons(persons.concat(personAdded))
                    setMessage(`Added ${personAdded.name}`)
                    setMessageClass('info')
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage('the operation couldn\'t be executed')
                    setMessageClass('error')
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    console.error(error)
                })
            setNewName('')
            setNewNumber('')
        }
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const deletePerson = (personToDelete) => {
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            console.log(personToDelete)
            personService
                .remove(personToDelete.id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== personToDelete.id))
                    setMessage(`${personToDelete.name} deleted`)
                    setMessageClass('info')
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage(`Information of ${personToDelete.name} has already been removed from server`)
                    setMessageClass('error')
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    console.error(error)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} className={messageClass} />
            <Filter value={filter} filterFunction={handleFilter} />
            <h3>add a new</h3>
            <PersonForm
                name={newName}
                number={newNumber}
                nameHandler={handleNewName}
                numberHandler={handleNewNumber}
                onSubmit={handleAddPerson}
            />
            <h3>Numbers</h3>
            <Persons persons={persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))}
                deleteFunction={deletePerson} />
        </div>
    )
}

export default App