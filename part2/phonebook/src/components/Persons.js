import React from 'react'

const Persons = ({ persons, deleteFunction }) => {
    return (
        <div>
            {persons.map(person =>
                <p key={person.name}>
                    {person.name} {person.number}
                    &nbsp;
                    <button onClick={() => deleteFunction(person)}>delete</button>
                </p>)}
        </div>
    )
}

export default Persons