import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(false)
  const navigate = useNavigate("");
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  },[])

  useEffect(()=>{
    if(!name&&!email&&!password){
        setError(false);
    }
   },[name,email,password]);


  const collectData = async () => {
    if(!name||!email||!password){
      setError(true);
      return false;
    }


    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (result.status===200) {
      result = await result.json();
      navigate("/login");
      toast.success(result.message)
    } else if(result.status===400){
      result = await result.json();
      toast.info(result.message)
    }else{
      result = await result.json();
      toast.error(result.message)
    }
  }

  return (
    <div className="sign-up-card">
      <h1>Register</h1>
      <input className='inputBox' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
      {error && !name && <span>Enter valid details</span>}
      <input className='inputBox' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
      {error && !email && <span>Enter valid details</span>}
      <input className='inputBox' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
      {error && !password && <span>Enter valid details</span>}
      <button onClick={collectData} className='submitButton'>Sign Up</button>
      <hr></hr>
      <h4>Already have an account?<Link to="/login"> Sign in</Link></h4>
    </div>
  )
}

export default SignUp;