const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

test('there are two users', async () => {
  const response = await api.get('/api/users')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json')
  expect(response.body.length).toBe(2)
})

test('user is saved in the DB', async () => {
  const newUser = {
    'username': 'asfsdf',
    'name': 'Edsger Dijkstra',
    'password': 'asdfg123456'
  }
  const savedUser = await api.post('/api/users').send(newUser)
  const usersAfterInsert = await api.get('/api/users')

  expect(usersAfterInsert.body.length - helper.initialUsers.length).toBe(1)
  expect(usersAfterInsert.body.find(blog => blog.id === savedUser.body.id)).toBeDefined()
})

describe('validate request on create user', () => {
  test('error 400 when password length is less than 3', async () => {
    const newUser = {
      'username': 'edijkstra',
      'name': 'Edsger Dijkstra',
      'password': 'as'
    }
    const response = await api.post('/api/users').send(newUser)
    const users = await api.get('/api/users')

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({ error: 'Password should have minimum 3 characters' })
    expect(users.body.length).toBe(helper.initialUsers.length)
  })

  test('error 400 when username length is less than 3', async () => {
    const newUser = {
      'username': 'aa',
      'name': 'Edsger Dijkstra',
      'password': 'asdf456'
    }
    const response = await api.post('/api/users').send(newUser)

    const users = await api.get('/api/users')
    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({ error: 'User validation failed: username: Path `username` (`aa`) is shorter than the minimum allowed length (3).' })
    expect(users.body.length).toBe(helper.initialUsers.length)
  })

  test('error 400 when username is not unique', async () => {
    const newUser = {
      'username': 'aaaa',
      'name': 'Edsger Dijkstra',
      'password': 'asdf456'
    }
    await api.post('/api/users').send(newUser)

    const duplicatedUser = {
      'username': 'aaaa',
      'name': 'Richard Stallman',
      'password': 'qwerty'
    }
    const response = await api.post('/api/users').send(duplicatedUser)

    const users = await api.get('/api/users')
    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({ error: 'User validation failed: username: Error, expected `username` to be unique. Value: `aaaa`' })
    expect(users.body.length - helper.initialUsers.length).toBe(1)
  })


})

afterAll(() => {
  mongoose.connection.close()
})
