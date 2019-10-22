import React, { useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const CreateBlogForm = React.forwardRef((props, ref) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const getTitle = () => {
        return title
    }
    const getAuthor = () => {
        return author
    }
    const getUrl = () => {
        return url
    }
    useImperativeHandle(ref, () => {
        return { getAuthor, getTitle, getUrl }
    })
    const removeReset = (obj) => {
        const { reset, ...filtered } = obj
        return filtered
    }

    return (
        <div>
            <h2>Create new </h2>
            <form onSubmit={props.handleCreateBlog}>
                <div>
                    title: &nbsp;
                    <input {...removeReset(title)} />
                </div>
                <div>
                    author: &nbsp;
                    <input {...removeReset(author)} />
                </div>
                <div>
                    url: &nbsp;
                    <input {...removeReset(url)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
})

CreateBlogForm.propTypes = {
    handleCreateBlog: PropTypes.func.isRequired
}
export default CreateBlogForm