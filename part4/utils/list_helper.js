const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (acc, blog) => {
    if (blog.likes > acc.likes) {
      return blog.likes
    }
    return acc
  }
  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const favoriteWriter = (blogs) => {
  const reducer = (acc, blog) => {
    if (blog.likes > acc.likes) {
      return { title: blog.title, author: blog.author, likes: blog.likes }
    }
    return acc
  }
  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const authorBlogsArray = _.chain(_.map(blogs, 'author'))
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()

  const authorWithMostBlogs = {
    author: authorBlogsArray[0],
  }

  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  favoriteWriter,
  mostBlogs
}
