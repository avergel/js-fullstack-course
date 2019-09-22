import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td><td>{value}</td>
        </tr>
    )
}
const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    if (all > 0) {
        return (
            <table>
                <tbody>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="all" value={all} />
                    <Statistic text="average" value={(good * 1 + bad * -1) / all} />
                    <Statistic text="positive" value={good * 100 / all + ' %'} />
                </tbody>
            </table>
        )
    }
    else {
        return (
            <div>
                No feedback given
            </div>
        )
    }
}
const App = (props) => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodFeedback = () => {
        setGood(good + 1)
    }
    const handleNeutralFeedback = () => {
        setNeutral(neutral + 1)
    }
    const handleBadFeedback = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <div>
                <h1> give feedback</h1>
                <Button onClick={handleGoodFeedback} text='good' />
                <Button onClick={handleNeutralFeedback} text='neutral' />
                <Button onClick={handleBadFeedback} text='bad' />
            </div>
            <div>
                <h1>statistics</h1>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
