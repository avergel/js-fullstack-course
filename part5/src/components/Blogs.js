import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs }) => {
  const blogInfoRef = React.createRef()
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(b =>
        <Blog key={b.id} blog={b} ref={blogInfoRef}>
        </Blog>)}
    </div>
  )
}

export default Blogs