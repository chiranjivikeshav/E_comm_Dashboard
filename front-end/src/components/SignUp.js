import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })

  const collectData = async () => {
    const result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.ok) {
      navigate("/login");
    } else {
      console.log("Registration failed");
    }
  }
  return (
    <div className="sign-up-card">
      <h1>Register</h1>
      <input className='inputBox' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
      <input className='inputBox' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
      <input className='inputBox' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
      <button onClick={collectData} className='submitButton'>Sign Up</button>
      <hr></hr>
      <h4>Already have an account?<Link to="/login"> Sign in</Link></h4>
    </div>
  )
}

export default SignUp;