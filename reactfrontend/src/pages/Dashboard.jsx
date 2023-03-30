import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BlogForm from '../components/BlogForm';
import Spinner from '../components/Spinner';
import { getBlogs, reset } from '../features/blogs/blogSlice';
import BlogItem from '../components/BlogItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const{ user } = useSelector((state) => state.auth);
  const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

  useEffect(() => {
    if(isError){
      console.log(message);
    };
    console.log("who this?"+user);

    if(!user) {
      navigate('/login');
    };
  
    // getBlogs can bug out if the token is null, this will cause dashboard to loop its code infinitely
    dispatch(getBlogs());

    return () => {
      dispatch(reset())
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  };
  // In the tutorial, only (blogs.length ? ...) is used, however when a user logs out the blogs.length results in an error. it's much better to check if the blogs are not null first, and/or not use length at all
  // March 26, 2023 - it's best to use an AND condition to first check if the blog object is defined(there's a user logged in, and blog is pulled from db), to then be able to check afterwards the length of the blog array. It was probably over looked since the tutorial did actually this sort of thing in the h1 welcome with user && user.name
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Blogs Dashboard</p>
      </section>
      <BlogForm />
      <section className='content'>
      {blogs && blogs.length > 0 ? (
        <div className="blogs">
          {blogs.map((blog) => ( // map creates a new array populated with the results of every element in the calling array
       <BlogItem key={blog._id} blog={blog} />
          ))}
        </div> ) : (<h3>You have not set any goals.</h3>)
      }    
      </section>
    </>
  );
};

export default Dashboard;