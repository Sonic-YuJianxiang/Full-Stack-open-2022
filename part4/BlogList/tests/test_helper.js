const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title:'Blog 1',
    author: 'Arthur Mitchell',
    url:'https://www.trinity.com',
    likes:'5'
  },
  {
    title:'Blog 2',
    author: 'Dexter Morgan',
    url:'https://www.ritamemorial.com',
    likes:'7'
  },
  {
    title:'Blog 3',
    author: 'Arthur Mitchell',
    url:'https://www.trinity.com',
    likes:'1'
  }
]

const initialUsers = [
  {
    username: 'dexter',
    name: 'Dexter Morgan', 
    password: 'dexter'
  },
  {
    username: 'trinity',
    name: 'Arthur Mitchell',
    password: 'trinity'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const userTokens = []

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, userTokens }