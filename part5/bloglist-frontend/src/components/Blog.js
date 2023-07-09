import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogList, setBlogs, currentUser, likeHandler }) => {

  const [showDetails, setShowDetails] = useState(false)
  const setWhenVisible = { display: showDetails ? '' : 'none' }

  const handleVisible = (event) => {
    event.preventDefault()
    showDetails ? setShowDetails(false) : setShowDetails(true)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    const blogs = await blogList
    blogService.setToken(currentUser.token)

    if(confirm(`Deleting ${blog.title} by ${blog.author}`)){
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(x => x.id !== blog.id))
    } else {
      return
    }
  }

  const blogStyle = {
    paddingTop: 12,
    paddingLeft: 12,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} by {blog.author} <button id='view-button' onClick={handleVisible}>{showDetails ? 'hide' : 'view'}</button>
      <div style={setWhenVisible} className='togglableContent'>
        <p id="blogUrl">{blog.url}</p>
        <p id="blogLikes">Likes {blog.likes} <button id="likeButton" onClick={likeHandler}>like</button></p>
        <p>{blog.user.name}</p>
        {currentUser.username === blog.user.username ? <button id='remove-button' onClick={removeBlog}>remove</button> : ''}
      </div>
    </div>
  )}

export default Blog