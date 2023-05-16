const listHelper = require('../utils/list_helper')
const totalLikes = require('../utils/list_helper').totalLikes

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when there is no blogs', () => {
      expect(totalLikes([])).toBe(0)
    })
  
    test('when there is only one blog', () => {
      expect(totalLikes([{likes: 1}])).toBe(1)
    })
  
    test('when there are several blogs', () => {
      const blogs = [
        {likes: 1},
        {likes: 3},
        {likes: 4}
      ]
      expect(totalLikes(blogs)).toBe(8)
  })
})

describe('favorite blog', () => {
  const singleBlog = [{likes: 9}]
  const blogs = [
    {likes:9},
    {likes:8},
    {likes:10}
  ]

  test('when there is no blogs', () => {
    expect(favoriteBlog([])).toEqual({})
  })

  test('when there is only one blog', () => {
    expect(favoriteBlog(singleBlog)).toEqual({likes: 9})
  })

  test('when there are several blogs', () => {
    expect(favoriteBlog(blogs)).toEqual({likes:10})
  })
})

describe('most blogs', () => {
  const singleBlog = [{author:'Beth'}]
  const blogs = [
    {author: 'Layla'},
    {author: 'Nick'},
    {author: 'Nick'}
  ]

  test('when there is no blogs', () => {
    expect(mostBlogs([])).toEqual({})
  })

  test('when there is a single blog', () => {
    expect(mostBlogs(singleBlog)).toEqual({author: 'Beth', blogs: 1})
  })

  test('when there are several blogs with several authors', () => {
    expect(mostBlogs(blogs)).toEqual({author: 'Nick', blogs: 2})
  })
})

describe('most likes', () => {

  const singleAuthor = [{author:'Beth', likes: 9}]
  const blogs = [
    {author: 'Layla', likes: 8},
    {author: 'Nick', likes: 10},
    {author: 'Nick', likes: 8},
    {author: 'Layla', likes: 9}
  ]

  test('when there are no blogs', () => {
    expect(mostLikes([])).toEqual({})
  })

  test('when there is a single blog', () => {
    expect(mostLikes(singleAuthor)).toEqual({author:'Beth', likes: 9})
  })

  test('when there are several blogs', () => {
    expect(mostLikes(blogs)).toEqual({author: 'Nick', likes: 18})
  })
})