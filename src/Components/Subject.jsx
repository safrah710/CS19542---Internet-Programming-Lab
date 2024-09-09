import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Subject() {
  const [subName, setSubName] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("hr");
  const [course, setCourse] = useState("");
  const [syllabus, setSyllabus] = useState("");
  let navigate=useNavigate();
   
  
  const courses = [
    'Computer Science and Engineering', 
    'Mechanical Engineering', 
    'Electrical and Electronics Engineering', 
    'Electronics and Communication Engineering', 
    'Bio Technology'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://examination-portal-nhe6.onrender.com/sub/add_sub', {
        subName, time, timeUnit, course, syllabus
      });
      if (res.status === 200) {
        toast.success("Subject added successfully");
        setSubName('');
        setTime('');
        setTimeUnit('hr');
        setCourse('');
        setSyllabus('');
        navigate('/Dashboard');

      } else {
        toast.error("Failed to add subject");
      }
    } catch (err) {
      toast.error("Submission failed");
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
            <p className="short">ADD SUBJECT</p>
            <input 
              type="text" 
              name="subject_name" 
              className="input3" 
              placeholder="SUBJECT NAME" 
              value={subName}
              onChange={(e) => setSubName(e.target.value)} 
              required 
            />
            <br />
            <input 
              type="number" 
              name="time" 

              className="input4" 
              placeholder="TIME" 
              value={time}
              onChange={(e) => setTime(e.target.value)} 
              required 
            />
            <br />
            <select 
              className="time" 
              value={timeUnit} 
              onChange={(e) => setTimeUnit(e.target.value)}
            >
              <option value="hr">HOUR</option>
              <option value="min">MINUTE</option>
            </select>
            <br/>
            <select 
              className="course" 
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
            <br/>
            <input 
              type="text" 
              name="syllabus" 
              className="input3" 
              placeholder="SYLLABUS" 
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)} 
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

export default Subject;
