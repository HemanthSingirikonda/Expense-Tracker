import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const Header = () => {
  const [loginUser,setLoginUser]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    let user=localStorage.getItem('user');
    user=JSON.parse(user);
    // user=user.name;
    // console.log(user);
    if(user){
      setLoginUser(user);
    }
  },[])
  const logoutHandler=()=>{
      localStorage.removeItem('user');
      message.success('Logged out successfully')
      navigate('/login');   
  }


  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link className="navbar-brand" to='/'>Expense Tracker</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <p className="nav-link active" aria-current="page">
          {
            loginUser && loginUser.name 
          }
          </p>
        </li>
        <li className="nav-item">
          <p
          onClick={logoutHandler}
          className="nav-link active" aria-current="page">
          Logout
          </p>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header