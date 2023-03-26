import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../features/blogs/blogSlice'

function BlogItem({blog}) {
  const dispatch = useDispatch();

  return (
    <div className='goal'>
      <div>
        {new Date(blog.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{blog.text}</h2>
      <button onClick={() => dispatch(deleteBlog(blog._id))} className="close">X</button>
    </div>
  )
}

export default BlogItem