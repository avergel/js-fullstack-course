const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json')
  expect(response.body.length).toBe(6)
})

test('blog id is defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('blog is saved in the DB', async () => {
  const blogsBeforeInsert = await api.get('/api/blogs')
  const newBlog = {
    'title': 'weatherstack: an Amazing Weather API',
    'author': 'David Walsh',
    'url': 'https://davidwalsh.name/weatherstack-an-amazing-weather-api',
    'likes': 99
  }
  const savedBlog = await api.post('/api/blogs').send(newBlog)
  const blogsAfterInsert = await api.get('/api/blogs')

  expect(blogsAfterInsert.body.length - blogsBeforeInsert.body.length).toBe(1)
  expect(blogsAfterInsert.body.find(blog => blog.id === savedBlog.body.id)).toBeDefined()

})

test('likes default to 0 if it is missing on the request', async () => {
  const newBlog = {
    'title': 'weatherstack: an Amazing Weather API',
    'author': 'David Walsh',
    'url': 'https://davidwalsh.name/weatherstack-an-amazing-weather-api'
  }
  const savedBlog = await api.post('/api/blogs').send(newBlog)
  expect(savedBlog.body.likes).toBe(0)
})
afterAll(() => {
  mongoose.connection.close()
})

test('post returns 400 when title and url are missing on the request', async () => {
  const newBlog = {
    'author': 'David Walsh',
    'likes': 99
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(400)
})

test('delete blog', async() => {
  const response = await api.delete(`/api/blogs/${new Blog(helper.initialBlogs[0]).id}`)
  expect(response.status).toBe(204)
  const blogsAfterDelete = await api.get('/api/blogs')
  expect(helper.initialBlogs.length - blogsAfterDelete.body.length).toBe(1)
})

test('update blog', async() => {
  const blogToUpdate = helper.initialBlogs[0]
  const response = await api.put(`/api/blogs/${new Blog(blogToUpdate).id}`)
    .send({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    })
  expect(response.type).toBe('application/json')
  expect(response.body.likes).toBe(blogToUpdate.likes + 1)
})