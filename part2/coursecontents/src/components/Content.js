import React from 'react'
import Part from './Part'

const Content = ({ parts }) => (
    <div>
        {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
        <b>total of {parts.reduce((x, y) => x + y.exercises, 0)} exercises</b>
    </div>
)

export default Content