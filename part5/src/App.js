import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoggedUserInfo from './components/LoggedUserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState('')
  const [blogs, setBlogs] = useState([])
  const blogFormRef = React.createRef()
  const blogRef = React.createRef()
  const loginRef = React.createRef()
  const createBlogRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (msg, msgStyle) => {
    setMessage(msg)
    setMessageStyle(msgStyle)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = loginRef.current.getUsername().value
      const password = loginRef.current.getPassword().value
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      loginRef.current.getUsername().reset()
      loginRef.current.getPassword().reset()
      setUser(user)
      showMessage(null)
    } catch (exception) {
      console.error(exception)
      showMessage('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const title = createBlogRef.current.getTitle().value
    const author = createBlogRef.current.getAuthor().value
    const url = createBlogRef.current.getUrl().value
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create({
        title,
        author,
        url
      })
      createBlogRef.current.getTitle().reset()
      createBlogRef.current.getAuthor().reset()
      createBlogRef.current.getUrl().reset()  
      setBlogs(await blogService.getAll())
      showMessage(`a new blog ${title} by ${author} added`, 'info')
    } catch (exception) {
      console.error(exception)
      showMessage('An error has ocurred while creating new blog', 'error')
    }
  }

  const handleLike = (event) => {
    const blog = JSON.parse(event.target.value)
    event.preventDefault()
    event.stopPropagation()
    blogRef.current.setBlog({
      ...blog,
      likes: blog.likes + 1
    })

  }

  return (
    <div>
      <Notification message={message} messageStyle={messageStyle} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          ref={loginRef} />
        :
        <div>
          <LoggedUserInfo user={user} logoutFunction={handleLogout} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm
              handleCreateBlog={handleCreateBlog}
              ref={createBlogRef} />
          </Togglable>
          <div>
            <h1>Blogs</h1>
            {blogs.map(b => <Blog key={b.id} blog={b} handleLike={handleLike} ref={blogRef}></Blog>)}
          </div>
        </div>
      }
    </div>
  )
}

export default App