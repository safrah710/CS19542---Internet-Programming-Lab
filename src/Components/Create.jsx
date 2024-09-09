import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Create() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setcon_Password] = useState("");
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [degree, setDegree] = useState("");
  const [yop, setYop] = useState("");
  const [role, setRole] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://examination-portal-nhe6.onrender.com/login/create_user', {
        name, age, email, password, con_password, state, course, degree, yop, role
      });
      if (res.status === 200) {
        toast.success("User created successfully");
        setName(''); setAge(''); setEmail(''); setPassword(''); setcon_Password('');
        setState(''); setCourse(''); setDegree(''); setYop(''); setRole('');
      } else {
        toast.error("Failed to create user");
      }
    } catch (err) {
      toast.error("Creation failed");
    }
  };

  return (
    <>
      <div className="new2">
        <h1 className="head">
          <marquee width="60%" direction="right" height="100px">
            WELCOME TO EXAMINATION PORTAL
          </marquee>
        </h1>
        <div className="main1">
          <div className="form2">
            <p className="short">CREATE USER</p>
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
            <input 
              type="password" 
              className="input6" 
              name="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              maxLength="8" 
            />
            <br />
            <input 
              type="password" 
              className="input7" 
              name="con_password" 
              placeholder="Confirm Password" 
              value={con_password}
              onChange={(e) => setcon_Password(e.target.value)} 
              required 
              maxLength="8" 
            />
            <br />
            <select 
              className="state" 
              name="state" 
              value={state} 
              onChange={(e) => setState(e.target.value)} 
              required
            >
              <option value="">-- Select State --</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="form3">
            <select 
              className="Degree" 
              name="degree" 
              value={degree} 
              onChange={(e) => setDegree(e.target.value)} 
              required
            >
              <option value="">--Degree--</option>
              {degrees.map((degree, index) => (
                <option key={index} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
            <br />
            <select 
              className="Course" 
              name="course" 
              value={course} 
              onChange={(e) => setCourse(e.target.value)} 
              required
            >
              <option value="">--Course--</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <br />
            <select 
              className="Yop" 
              name="yop" 
              value={yop} 
              onChange={(e) => setYop(e.target.value)} 
              required
            >
              <option value="">-- Year of Passing --</option>
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
              className="input8" 
              placeholder="Role (student or teacher)" 
              value={role}
              onChange={(e) => setRole(e.target.value)} 
              required 
            />
            <br />
            <button className="logbtn1" onClick={handleSubmit}>
              SUBMIT
            </button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
