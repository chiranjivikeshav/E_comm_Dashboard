import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {


  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
      const response = await fetch('http://localhost:5000/login', {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        if (response.status === 200) {
          return response.json(); 
        } else {
          return response.json().then(data => {
            throw new Error(data.message || 'Login failed');
          });
        }
      })
      .then(data => {
        if (data && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
          throw new Error('Invalid response structure');
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
      });


  }



  return (
    <div className="sign-up-card">
      <h1>Login</h1>
      <input className='inputBox' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
      <input className='inputBox' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
      <button onClick={handleLogin} className='submitButton'>Sign In</button>
      <hr></hr>
      <h4>Don't have account yet?<Link to="/signup"> Sign Up</Link></h4>
    </div>
  )
}

export default Login;