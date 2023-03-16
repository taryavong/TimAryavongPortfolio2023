import React from 'react';
import { useState, useEffect} from 'react';
import { FaUser } from 'react-icons/fa';


function Register() {
  const [formData, setFormData] = useState({ // state allows you to store and manage the data in this component
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => { //any changed parameter gets placed in e
    setFormData((prevState) => ({ //setting the form data to an object
      ...prevState, // the ellipsis will spread data to other form values
      [e.target.name] : e.target.value,
    }))
  };
  const onSubmit = (e) => {
    e.preventDefault();
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
            type='password2' 
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