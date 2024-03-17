import React, { useEffect, useState } from 'react';
import "../styles/addstyle.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const navi = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);
  const id = useParams
  const handleCheckboxChange = (e) => {
    
    const { value, checked } = e.target;
    if (checked) {
      setCourse(value);
    } else {
      setCourse('');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); 
      formData.append('name', name);
      formData.append('email', email);
      formData.append('number', number);
      formData.append('designation', designation);
      formData.append('gender', gender);
      formData.append('course', course);
      formData.append('file', file); 

      const response = await axios.put(`http://localhost:5000/api/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      if (response.status === 201) {
        alert("Employee Updated");
       navi("/home")
      } else {
        alert("Failed to Add Employee");
        console.log(response);
      }
    } catch (error) {
      alert("Server Error");
    }
  };

   const  fetchdata = async() => {
           try {
            const response = await axios.get(`http://localhost:5000/api/user/${id}`)
           console.log(response.data)
            if(response.status === 201){
              const edata = response.data
              setName(edata.name)
              setEmail(edata.email)
              setNumber(edata.number)
              setDesignation(edata.designation)
              setCourse(edata.course)
              setFile(edata.img_url)
            }
           } catch (error) {
            
           }
   }

   useEffect(()=>{
    fetchdata()
   },[])

  return (
    <div className='main-div'>
      <form className="add-form" onSubmit={handleSubmit}>
        <p>Add Employee</p>
        <div className='input-div'>
          <label>Name</label>
          <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='input-div'>
          <label>Mail</label>
          <input type="email" placeholder='Enter E-Mail' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input-div'>
          <label>Number</label>
          <input type="number" placeholder='Enter Number' value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className='input-div'>
          <label>Designation</label>
          <select name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)}>
            <option value="">Select Designation</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="radio-checkbox-row">
          <label>Gender</label>
          <div className='input-div'>
            <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
            <label htmlFor="male">Male</label>
          </div>
          <div className='input-div'>
            <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="radio-checkbox-row">
          <label>Course</label>
          <div className='input-div'>
            <input type="checkbox" id="mca" name="course" value="MCA" checked={course === 'MCA'} onChange={handleCheckboxChange} />
            <label htmlFor="mca">MCA</label>
          </div>
          <div className='input-div'>
            <input type="checkbox" id="bca" name="course" value="BCA" checked={course === 'BCA'} onChange={handleCheckboxChange} />
            <label htmlFor="bca">BCA</label>
          </div>
          <div className='input-div'>
            <input type="checkbox" id="bsc" name="course" value="BSc" checked={course === 'BSc'} onChange={handleCheckboxChange} />
            <label htmlFor="bsc">BSc</label>
          </div>
        </div>
        <div className='input-div'>
          <label>Upload image</label>
          <input type="file" name="file" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default EditEmployee;
