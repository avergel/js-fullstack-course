const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const checkToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return false
    }
    return decodedToken.id
  } catch (e) {
    return false
  }
}


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch(e) {
    next(e)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const userId = checkToken(request.token)
    if (!userId) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(userId)
    const blogToSave = {
      ...body,
      user: user._id
    }
    const savedBlog = await new Blog(blogToSave).save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(e) {
    next(e)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const userId = checkToken(request.token)
    if (!userId) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === userId.toString()) {
      await blog.remove()
      response.status(204).end()
    } else {
      response.status(403).end()
    }
  } catch (e) {
    next(e)
  }
})

module.exports = blogsRouter