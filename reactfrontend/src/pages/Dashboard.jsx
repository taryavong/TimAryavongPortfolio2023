import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BlogForm from '../components/BlogForm';
import Spinner from '../components/Spinner';
import { getBlogs, reset } from '../features/blogs/blogSlice';

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

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Blogs Dashboard</p>
      </section>
      <BlogForm />
    </>
  );
};

export default Dashboard;