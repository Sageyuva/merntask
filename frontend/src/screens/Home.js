import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import "../styles/homestyle.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navi = useNavigate()

  const [data, setdata] = useState([])


  const HandleDelte = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${id}`)
      window.location.reload()
    } catch (error) {
      alert("FAILED TO DELETE")
    }
  }

  const fetchdata = async() => {
    
    try {
      const response = await axios.get("http://localhost:5000/api/")
      if(response.status === 201){
        setdata(response.data)
        console.log(response)
      }
      else(console.log("Failed to fetch data"))
    } catch (error) {
      console.log("server error")
    }

  }

  useEffect(()=>{
fetchdata()

const user = localStorage.getItem("user")
if(!user){
  navi("/")
}
  },[])

  return (
    <>
      <NavBar />
      <table>
  <tr>
    <th>ID</th>
    <th>Image</th>
    <th>Name</th>
    <th>E-mail</th>
    <th>Number</th>
    <th>Designation</th>
    <th>Gender</th>
    <th>Course</th>
    <th>Created Date</th>
    <th>Actions</th>
  </tr>

  {
    data ? data.map((emp)=>{
      return(
        <tr>
    <td>{emp._id}</td>
    <td><img src={`http://localhost:5000/images/${emp.imgUrl}`} alt="1" /></td>
    <td>{emp.name}</td>
    <td>{emp.email}</td>
    <td>{emp.number}</td>
    <td>{emp.designation}</td>
    <td>{emp.gender}</td>
    <td>{emp.course}</td>
    <td>{emp.createdDate.split('T')[0]}.</td>
    <td className='btns'>
     <Link to={`/edit/${emp._id}`}>
     <button className='edbtn'>
        Edit
      </button>
     </Link>
      <button className='dlbtn' onClick={() => HandleDelte(emp._id)}>
        Delete
      </button>
    </td>
  </tr>
      )
    }) : <p>No data found</p>
  }


</table>

       </>
  )
}

export default Home