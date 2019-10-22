import React from 'react'
import { render, fireEvent } from '@testing-library/react' // highlight-line
import SimpleBlog from './SimpleBlog'
import '@testing-library/jest-dom/extend-expect'

test('renders content', () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    likes: 99
  }


  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Title 1 Author 1'
  )
  expect(component.container).toHaveTextContent(
    'blog has 99 likes'
  )
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    likes: 99
  }
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.container.querySelector('.likeButton')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})