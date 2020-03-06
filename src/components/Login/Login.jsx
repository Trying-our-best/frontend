import React, { useState, useEffect } from 'react';

// library imports
import axios from 'axios';
import Loader from 'react-loader-spinner';

// style sheet import
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './Login.scss';

const Login = props => {
   // setting initial state with React hooks
   const [user, setUser] = useState({
      username: '',
      email: '',
      password: ''
   });

   const token = localStorage.getItem('token');
   const key = localStorage.getItem('key');

   if (localStorage.getItem(token) || localStorage.getItem(key)) {
      props.history.push('/game');
   }

   // using a hook to handle Loading state
   const [isLoading, setIsLoading] = useState(false);

   // hook to determine success as failure of the request
   const [messages, setMessages] = useState({
      success: false,
      failure: false
   });

   // updating the state every time the user adds new information to the fields
   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      });
   };

   // handling form validation
   const [touched, setTouched] = useState({
      username: false,
      email: false,
      password: false
   });

   const toggleTouched = e => {
      setTouched({
         ...touched,
         [e.target.name]: true
      });
   };

   const handleSubmit = event => {
      // preventing the page from rerendering onSubmit
      event.preventDefault();

      // switching isLoading to true so the loader animation shows up
      setIsLoading(true);

      // POSTing the new user when the user submits
      axios
         .post(`https://cs-bw1-mud.herokuapp.com/api/login/`, user)
         .then(res => {
            setMessages({
               ...messages,
               success: true
            });
            localStorage.setItem('token', res.data.key);

            setTimeout(() => {
               props.history.push('/game');
               window.location.reload();
            }, 3000);
         })
         .catch(err => {
            setMessages({
               ...messages,
               failure: true
            });
            setTimeout(() => {
               setIsLoading(false);
            }, 3000);
         });
   };

   return (
      <div className="login-container">
         <form className="form-container" onSubmit={handleSubmit}>
            <h1 className="login-heading">Login</h1>
            <label className="form-label">
               Username
               <br />
               <input
                  type="username"
                  className="form-input"
                  onChange={handleChange}
                  name="username"
                  value={user.username}
                  onBlur={toggleTouched}
               />
               {user.username === '' && touched.username === true ? (
                  <p className="required-error">
                     Username is a required field.
                  </p>
               ) : null}
            </label>
            <div className="divider"></div>
            <label className="form-label">
               Email
               <br />
               <input
                  type="email"
                  className="form-input"
                  onChange={handleChange}
                  name="email"
                  value={user.email}
                  onBlur={toggleTouched}
               />
               {user.email === '' && touched.email === true ? (
                  <p className="required-error">Email is a required field.</p>
               ) : null}
            </label>
            <div className="divider"></div>
            <label className="form-label">
               Password
               <br />
               <input
                  type="password"
                  className="form-input"
                  onChange={handleChange}
                  name="password"
                  value={user.password}
                  onBlur={toggleTouched}
               />
               {user.password === '' && touched.password === true ? (
                  <p className="required-error">
                     Password is a required field.
                  </p>
               ) : null}
            </label>
            {messages.success ? (
               <h2 className="messages messages-success">
                  Login Successful. Welcome back!
               </h2>
            ) : null}
            {messages.failure ? (
               <h2 className="messages">
                  Login Failed. Please check your credentials.
               </h2>
            ) : null}
            {isLoading ? (
               <button className="login-btn">
                  <Loader
                     type="Oval"
                     color="#d3d3d3"
                     height={40}
                     width={40}
                     timeout={10000} //10 secs
                     style={{ marginTop: '.2rem' }}
                  />
               </button>
            ) : (
               <button
                  className="login-btn"
                  disabled={!user.username || !user.password}
               >
                  Sign In
               </button>
            )}
         </form>
      </div>
   );
};

export default Login;
