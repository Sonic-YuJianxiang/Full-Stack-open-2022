const blogsRouter = require('express').Router()
const Blog = require('../models/note')
const listHelper = require('../utils/list_helper')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  response.json(blog)
})

blogsRouter.get('/mostlikes', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(listHelper.mostLikes(blogs))
})

blogsRouter.get('/mostblogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(listHelper.mostBlogs(blogs))
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const userId = user.id.toString()

  const blog = await Blog.findById(request.params.id)
  const blogId = blog.user.toString()

  if (userId === blogId){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'current user is not the author of this blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog =
        await Blog.findByIdAndUpdate(request.params.id, blog, { new:true, runValidators: true, context: 'query' }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

module.exports = blogsRouter