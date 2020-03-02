import React, { useState, useEffect } from 'react';

// library imports
import axios from 'axios';
import Loader from 'react-loader-spinner';

// style sheet import
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Register = props => {
   // setting initial state with React hooks
   const [user, setUser] = useState({
      username: '',
      email: '',
      password1: '',
      password2: ''
   });

   // using a hook to handle Loading state
   const [isLoading, setIsLoading] = useState(false);

   // hook to determine success as failure of the request
   const [messages, setMessages] = useState({
      success: false,
      failure: false,
      userExists: false
   });

   // if the user is already logged in, we want to push them back to the game
   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
         props.history.push('/game');
      }
   }, []);

   // updating the state every time the user adds new information to the fields
   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      });
   };

   const handleSubmit = event => {
      // preventing the page from rerendering onSubmit
      event.preventDefault();

      // switching isLoading to true so the loader animation shows up
      setIsLoading(true);

      // POSTing the new user when the user submits
      axios
         .post('https://lambda-mud-test.herokuapp.com/api/registration/', user)
         .then(res => {
            setMessages({
               ...messages,
               success: true
            });
            localStorage.setItem('token', res.data.key);
            setTimeout(() => {
               props.history.push('/game');
            }, 3000);
         })
         .catch(err => {
            setTimeout(() => {
               setIsLoading(false);

               if (err.response.status === 422) {
                  setMessages({
                     ...messages,
                     userExists: true
                  });
               } else {
                  setMessages({
                     ...messages,
                     failure: true
                  });
               }
            }, 3000);
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

   return (
      <div className="signup-container">
         <h1 className="signup-heading">Sign Up</h1>
         <form className="form-container" onSubmit={handleSubmit}>
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
                     username is a required field.
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
                  name="password1"
                  value={user.password1}
                  onBlur={toggleTouched}
               />
               {user.password1 === '' && touched.password1 === true ? (
                  <p className="required-error">
                     Password is a required field.
                  </p>
               ) : null}
            </label>
            <div className="divider"></div>
            <label className="form-label">
               Confirm Password
               <br />
               <input
                  type="password"
                  className="form-input"
                  onChange={handleChange}
                  name="password2"
                  value={user.password2}
                  onBlur={toggleTouched}
               />
               {user.password2 === '' && touched.password2 === true ? (
                  <p className="required-error">
                     Password is a required field.
                  </p>
               ) : null}
            </label>
            <div className="divider"></div>
            {messages.success ? (
               <h2 className="messages messages-success">
                  Account created successfully. Welcome!
               </h2>
            ) : null}
            {messages.failure ? (
               <h2 className="messages">
                  Credentials invalid. Please make sure you filled out the form
                  correctly.
               </h2>
            ) : null}
            {messages.userExists ? (
               <h2 className="messages">
                  You already have an account. Please use your credentials to
                  login to your account.
               </h2>
            ) : null}
            {isLoading ? (
               <button className="login-btn">
                  <Loader
                     type="Oval"
                     color="#FFFFFF"
                     height={40}
                     width={40}
                     timeout={10000} //10 secs
                     style={{ marginTop: '.2rem' }}
                  />
               </button>
            ) : (
               <button
                  className="signup-btn"
                  disabled={
                     !user.username || !user.password1 || !user.password2
                  }
               >
                  Register
               </button>
            )}
         </form>
      </div>
   );
};

export default Register;
