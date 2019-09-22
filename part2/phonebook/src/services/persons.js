import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const getMaxId = () => {
    return getAll()
        .then(response =>
            response
                .map(o => o.id)
                .reduce((x, y) => (x > y) ? x : y, 1))
}

const create = (person) => {
    return getMaxId()
        .then(maxId =>
            axios
                .post(baseUrl, { ...person, id: maxId + 1 })
                .then(response => response.data))
}

const update = (person) => {
    return axios
        .put(`${baseUrl}/${person.id}`, person)
        .then(response => response.data)
}
const remove = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

export default { create, getAll, remove, update }