import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
const Nav = ()=>{
  const navigate = useNavigate("");
  const auth = localStorage.getItem('user');
  const logout =()=>{
     localStorage.clear();
  }
  return (
    <div>
      <h2 className='logo'>Dashboard</h2>
      <ul className='nav-ul'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Product</Link></li>
      </ul>
      { auth ?<Link className='auth' onClick={logout} to="/login">Logout</Link>: <Link className='auth' to="/login">Login</Link>}

        {/* <li><Link to="/profile">Profile</Link></li> */}
        {/* <li><Link to="/logout">Logout</Link></li> */}
        {/* <li><Link to="/signup">Sign Up</Link></li> */}
      
    </div>
  )
}

export default Nav