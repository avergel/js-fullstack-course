import React from 'react'

const Filter = ({ value, filterFunction }) => {
    return (
        <div>
            filter shown with <input value={value} onChange={filterFunction} />
        </div>
    )
}

export default Filter