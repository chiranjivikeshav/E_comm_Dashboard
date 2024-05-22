import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {


  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  },[])


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(false)

  useEffect(()=>{
    if(!email&&!password){
        setError(false);
    }
   },[email,password]);


  const handleLogin = async () => {
      if(!email||!password){
      setError(true);
      return false;
      }

      let response = await fetch('http://localhost:5000/login', {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if(response.status===200){
      response = await response.json();
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", JSON.stringify(response.auth));
      navigate("/");
    } else {
      response = await response.json();
      toast.error(response.message)
    }

  }


  return (
    <div className="sign-up-card">
      <h1>Login</h1>
      <input className='inputBox' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
      {error && !email && <span>Enter valid details</span>}
      <input className='inputBox' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
      {error && !password && <span>Enter valid details</span>}
      <button onClick={handleLogin} className='submitButton'>Sign In</button>
      <hr></hr>
      <h4>Don't have account yet?<Link to="/signup"> Sign Up</Link></h4>
    </div>
  )
}

export default Login;