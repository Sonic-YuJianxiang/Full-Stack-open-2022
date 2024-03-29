import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import AddBlog from '../components/AddBlog'

const currentUser = {
  username: 'yjx',
  name: 'YJX'
}

const blog = {
  title: 'yjx title',
  author: 'yjx author',
  url: 'yjx url',
  user: {
    username: 'yjx',
    name: 'YJX'
  }
}

describe('component test for blog module', () => {
  test('render content', async () => {

    const { container } = render(<Blog blog={blog} currentUser={currentUser}/>)
    const element = screen.getByText('yjx title by yjx author')
    expect(element).toBeDefined()
    const blogUrl = container.querySelector('#blogUrl')
    expect(blogUrl).not.toBeVisible()
    const blogLikes = container.querySelector('#blogLikes')
    expect(blogLikes).not.toBeVisible()
  }),

  test('render required content after click', () => {

    const { container } = render(<Blog blog={blog} currentUser={currentUser}/>)

    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    const blogUrl = container.querySelector('#blogUrl')
    expect(blogUrl).toBeVisible()
    const blogLikes = container.querySelector('#blogLikes')
    expect(blogLikes).toBeVisible()
  }),

  test('event handler is called twice after two clicks', () => {

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} currentUser={currentUser} likeHandler={mockHandler}/>)

    const buttonView = screen.getByText('view')
    userEvent.click(buttonView)

    const buttonLike = container.querySelector('#likeButton')
    userEvent.click(buttonLike)
    userEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  }),

  test('get the right details when a new blog is created', () => {
    const mockHandler = jest.fn()

    render(<AddBlog blogAdd={mockHandler}/>)

    const input = screen.getAllByRole('textbox')
    userEvent.type(input[0], 'yjx title')
    userEvent.type(input[1], 'yjx author')
    userEvent.type(input[2], 'yjx url')
    const addButton = screen.getByText('create')
    userEvent.click(addButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('yjx title')
    expect(mockHandler.mock.calls[0][0].author).toBe('yjx author')
    expect(mockHandler.mock.calls[0][0].url).toBe('yjx url')
  })
})