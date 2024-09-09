import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/Uselogout';
function View() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [degree, setDegree] = useState("");
  const [yop, setYop] = useState("");
  const [role, setRole] = useState("");
  let navigate=useNavigate();
  let logout=useLogout();
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 
    'Puducherry', 'Ladakh', 'Jammu and Kashmir'
  ];

  const degrees = ['B.E', 'B.TECH'];
  const courses = [
    'Computer Science and Engineering', 'Mechanical Engineering', 
    'Electrical and Electronics Engineering', 
    'Electronics and Communication Engineering', 'Bio Technology'
  ];
  const yearsOfPassing = ['2025', '2026', '2027'];
  const get_data = async () => {
    let params={name:sessionStorage.getItem('name')}
    try {
      const res = await axios.get('https://examination-portal-nhe6.onrender.com/login/get_user',{params});
      if (res.status === 200) {
        let data1=res.data.data;
        console.log(data1);
        setName(data1[0].name);
        setAge(data1[0].age);
        setEmail(data1[0].email);
        setState(data1[0].state);
        setDegree(data1[0].degree);
        setYop(data1[0].yop);
        setRole(data1[0].role)
        console.log(res.data.data);
      } else {
        toast.error("Failed to  fetch user");
      }
    } catch (err) {
      console.log("hi");
    }
  };

useEffect(()=>{
get_data();
},[])
const edit=async()=>{
    let old_name=sessionStorage.getItem('name');
    try{
       let res=await axios.post('https://examination-portal-nhe6.onrender.com/login/edit_user',{
        old_name,name,age,state,course,degree,yop,role
       })
       if(res.status===200){
        axios.success("edited successfully");
        sessionStorage.setItem('name',name);
       }
       else{
        axios.error("edited successfully");
       }

    }
    catch (err) {
        console.log(err);
      }
}

  return (
    <>
      <div className="new2">
      <div className="header">
                <div className="content">
                    <div className="p5">
                        <marquee width="90%" direction="right" height="50px">
                            <p className="p4">WELCOME TO EXAMINATION PORTAL</p>
                        </marquee>
                    </div>
                    <div className="nav">
                        <p className="new-logo" onClick={()=>{
                            navigate('/Dashboard')
                        }}>HOME</p>
                        <p className="new-logo" onClick={()=>{
                            logout();
                        }}>LOGOUT</p>
                    </div>
                </div>
            </div>
        <div className="main1">
          <div className="form4">
            <p className="short">PROFILE SECTION</p>
            <input
              type="text" 
              name="name" 
              className="input3" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <br />
            <input 
              type="number" 
              name="age" 
              className="input4" 
              placeholder="Age" 
              value={age}
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
            <br />
            <input 
              type="email" 
              className="input5" 
              name="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <br />
            <select 
              className="state" 
              name="state" 
              value={state} 
              onChange={(e) => setState(e.target.value)} 
              required
                    >
              
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="form5">
            <select 
              className="Degree" 
              name="degree" 
              value={degree} 
              onChange={(e) => setDegree(e.target.value)} 
              required
            >
             
              {degrees.map((degree, index) => (
                <option key={index} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
            <br />
            <select 
              className="Course1" 
              name="course" 
              value={course} 
              onChange={(e) => setCourse(e.target.value)} 
              required
            >
              
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <br />
            <select 
              className="Yop1" 
              name="yop" 
              value={yop} 
              onChange={(e) => setYop(e.target.value)} 
              required
            >
              
              {yearsOfPassing.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <br />
            <input 
              type="text" 
              name="role" 
              className="input10" 
              placeholder="Role (student or teacher)" 
              value={role}
              onChange={(e) => setRole(e.target.value)} 
              required 
            />
            <br />
            <button className="logbtn1" onClick={()=>{
                edit()
            }} >
               SAVE EDIT
            </button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
