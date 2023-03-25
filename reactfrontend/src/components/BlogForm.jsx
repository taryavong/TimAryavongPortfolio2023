import React from 'react';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { createBlog } from '../features/blogs/blogSlice';

function BlogForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    dispatch(createBlog({text}));
    setText('');
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="text">Blog</label>
          <input 
          type="text" 
          name='text' 
          id='text' 
          value={text}
          onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type='submit'>Add Blog</button>
        </div>
      </form>
    </section>
  )
}

export default BlogForm