const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else if (blogs.length === 1) {
        return {...blogs[0]}
    } else {
        const favorite = blogs.reduce((prev, current) => { prev.likes > current.likes ? prev : current })
        return {title: favorite.title, author: favorite.author, likes: favorite.likes}
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return {}
    } else {
      const reducedBlogs = blogs
        .map(blog => blog.author)
        .reduce((author, val) => {
          author[val] = (author[val] || 0) + 1
          return author
        }, {})
  
      const mostBlogsAuthor =
          Object.keys(reducedBlogs)
            .map(key => ({ author:key, blogs:reducedBlogs[key] }))
            .reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current)
  
      return mostBlogsAuthor
    }
  }
  
const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {

        const reducedBlogs = blogs
        .reduce((acc, blog) => ({
            ...acc,
            [blog.author]: (acc[blog.author] || 0) + blog.likes
        }), {})

        const mostLikesAuthor =
            Object.keys(reducedBlogs)
            .map(key => ({ author: key, likes:reducedBlogs[key] }))
            .reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

        return mostLikesAuthor
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}