import React from 'react'
import "../styles/navstyle.css"
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navi = useNavigate()
  return (
    <div className='nav-main'>
    <div>
<Link to="/add"> <button className='add'>Add Employee</button></Link>
    </div>
    <div className='info'>
      <p className='log-user'>Logged User</p>
      <button className='log' onClick={()=>{
        localStorage.clear()
        window.location.reload()
      }}>Logut</button>
    </div>
    </div>
  )
}

export default NavBar