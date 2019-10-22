import React, { useState, useImperativeHandle } from 'react'
const Blog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(props.blog)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      setBlog
    }
  })

  return (
    <div style={blogStyle} onClick={toggleVisibility}>
      <div >
        {blog.title} - {blog.author}
      </div>
      <div style={showWhenVisible}>
        <div>
          <p>{blog.url} <br />
            {blog.likes} likes <button onClick={props.handleLike} value={JSON.stringify(blog)}> like</button><br />
            added by {blog.user.name}<br />
          </p>
        </div>
      </div>
    </div>
  )
})

export default Blog