import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import  { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

const SignUp = () => {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status


  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value)
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }


  const handleonSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { name, username, email, password } = user;
      if (name && username && email && password && isChecked) {
        const response = await axios.post('http://localhost:9002/signup', user);
        if (response.status === 201) {
          // Assuming the server sends back a message like { message: 'User registered successfully.' }
          console.log(response.data.user); // Log the response data
          setUserData(response.data.user);
          alert('Registration Successful');
          navigate("/ProfileForm"); // Navigate to the next page
        } else {
          console.log('Unexpected response status:', response.status);
          alert('Registration Failed: Unexpected response status');
        }
      } else {
        alert('Invalid details');
      }
    } catch (error) {
      if (error.response) {
        console.log('Error registering user:', error.response.data.error);
        alert('Registration Failed: ' + error.response.data.error);
      } else {
        console.log('Error:', error.message);
        alert('Registration Failed: ' + error.message);
      }
    }
  };


  return (
    
    <div className="flex ">
      
      {/* Left half with yellow background */}
      <div className="hidden lg:flex lg:w-2/5">
        <img src="dribble.jpg" className="lg:h-full lg:object-contain" alt="Dribble Logo" />
      </div>

      {/* Right half with signup form */}
      <div className="ml-2 p-5 pt-15  lg:w-3/5 lg:ml-18 lg:pt-10 lg:pl-20">
        <div className="lg:text-right lg:pr-5 lg:mb-5">
          <p>Already a member? <a href="#"><span className='text-blue-500  lg:text-blue-500'>Sign In</span></a></p>
        </div>
        <div className="lg:pl-20 lg:pt-5 lg:ml-20">
          <h1 className="text-2xl font-bold pt-7 pb-7     lg:text-3xl lg:font-bold lg:mb-2">Sign up to Dribbble</h1>
          <form>
            <div className='lg:flex'>
              <div className="grid pb-7 font-bold lg:pt-9 lg:mb-5 lg:pr-8 lg:py-2">
                <label htmlFor="name" className="lg:block lg:mb-1">Name</label>
                <input required type="text" id="name" name="name" value={user.name} onChange={handleChange} className="m-1 p-3 w-11/12 border border-gray-500 rounded-md lg:px-3 lg:py-2  lg:bg-gray-200 lg:w-full lg:h-18 lg:border lg:border-white lg:rounded-md lg:px-3 lg:py-2" />
              </div>
              <div className="grid pb-7 font-bold lg:pt-9 lg:mb-5 lg:py-2">
                <label htmlFor="Username" className="lg:block lg:mb-1">Username</label>
                <input required type="text" id="username" name="username" value={user.username} onChange={handleChange} className="m-1 p-3 w-11/12 border border-gray-500 rounded-md lg:bg-gray-200 lg:w-full lg:h-18 lg:border lg:border-white lg:rounded-md lg:px-3 lg:py-2" />
              </div>
            </div>
            <div className="grid pb-7 font-bold lg:mb-5 lg:py-2">
              <label htmlFor="email" className="lg:block lg:mb-1">Email</label>
              <input required type="email" id="email" name="email" value={user.email} onChange={handleChange} className="m-1 p-3 w-11/12 border border-gray-500 rounded-md lg:bg-gray-200 lg:w-8/12 lg:border lg:border-white lg:rounded-md lg:px-3 lg:py-2" />
              
            </div>
            <div className="grid pb-7 font-bold">
              <label htmlFor="password" className="lg:block lg:mb-1">Password</label>
              <input required type="password" id="password" name="password" value={user.password} onChange={handleChange} className="m-1 p-3 w-11/12 border border-gray-500 rounded-md lg:bg-gray-200 lg:w-8/12 lg:border lg:border-white lg:rounded-md lg:px-3 lg:py-2" />
            </div>
            <div className="w-11/12 lg:mb-2 lg:w-9/12 lg:flex ">

              <input required type="checkbox" checked={isChecked} onChange={handleCheckboxChange} id="agree" className="m-1 ml-2" />
              <div className='lg:ml-2'>Creating an account means you're okay with our <span className="lg:text-blue-700">Terms of Service</span>, <span className="text-blue-700">Privacy Policy</span>, and our default <span className="text-blue-700">Notification Settings</span>.</div>

            </div>
            <button type="submit" onClick={handleonSubmit} className="bg-pink-500 text-white px-4 py-3 rounded-2xl w-11/12 mt-7 lg:bg-pink-500 lg:text-white lg:px-4 lg:py-3 lg:rounded-md lg:w-1/4">Create Account</button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default SignUp;
