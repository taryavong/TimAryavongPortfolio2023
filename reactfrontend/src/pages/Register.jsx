import React from 'react';
import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa';
import { register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

  // Destructure formData and setFormData hook from the state, states have setters and getters, here we only use a setter
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // Declare destructured formData, to be used in the functions below
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();

  // Dispatch is a redux function that allows you to send or "dispatch" actions to the store to update the state. The store will then call the root reducer using the current state and dispatched action as arguments. The reducer processes the action and returns a new state, which then updates the store.
  const dispatch = useDispatch();

  // A hook, react function that allows you to use state and other React features without having to convert them to class components.
  // useSelector is a hook to select a specific redux store state(we only have auth atm)
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  // Use effect depends on values in the list, if anything in the list changes it will go into effect
  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => { // Any changed parameter gets placed in e
    setFormData((prevState) => ({ // Setting the form data to an object
      ...prevState, // The ellipsis will declare data entered from form values to their respective 
      [e.target.name] : e.target.value,
    }))
  };

  // Data submitted
  const onSubmit = (e) => {
    e.preventDefault();

    // Password confirmation check
    if(password !== password2) {
      toast.error('Passwords do not match')
    }
    
    // Password confirmed, declare user data to be dispatched to register
    else {
      const userData = {
        name,
        email,
        password,
      };

      // Dispatch registration action with user data.
      dispatch(register(userData));
    };
  };

  if(isLoading) {
    return <Spinner />;
  };

return <>
  <section className='heading'>
    <h1>
      <FaUser/> Register
    </h1>
    <p>Please create an account</p>
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text' 
            className='form-control' 
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text' 
            className='form-control' 
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password' 
            className='form-control' 
            id='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password' 
            className='form-control' 
            id='password2'
            name='password2'
            value={password2}
            placeholder='Confirm your password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </section>
  </section>
</>
};

export default Register;