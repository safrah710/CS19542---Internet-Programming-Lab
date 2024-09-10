import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/UseLogout';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [selectedCourse, setSelectedCourse] = useState("Computer Science and Engineering");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    let role=sessionStorage.getItem('role');
    let logout=useLogout()
    const courses = [
        'Computer Science and Engineering', 
        'Mechanical Engineering', 
        'Electrical and Electronics Engineering', 
        'Electronics and Communication Engineering', 
        'Bio Technology'
    ];

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const get_data = async () => {
        let url = 'https://examination-portal-nhe6.onrender.com/sub/get_sub';
        let params = { course: selectedCourse };
        try {
            const response = await axios.get(url, { params });
            let data1 = response.data.data;
            setData(data1); 
        } catch (err) {
            console.log("Error fetching data");
        }
    };

    useEffect(() => {
        get_data();
    }, [selectedCourse]);

    return (
        <div className="new4">
            <div className="header">
                <div className="content">
                    <div className="p5">
                        <marquee width="90%" direction="right" height="50px">
                            <p className="p4">WELCOME TO EXAMINATION PORTAL</p>
                        </marquee>
                    </div>
                    <div className="nav">
                        <p className="new-logo">HOME</p>
                        {role==="official"?"":<p className="new-logo" onClick={()=>{
                            navigate('/Dashboard/View');
                        }}>PROFILE</p>}
                        <p className="new-logo" onClick={()=>{
                            navigate('/Dashboard/Analytics')
                        }}>ANALYTICS</p>
                        <p className="new-logo" onClick={()=>{
                            navigate('/Guidelines');
                        }}>GUIDELINES</p>
                        <p className="new-logo" onClick={()=>{
                            logout();
                        }}>LOGOUT</p>
                    </div>
                </div>
            </div>

            <div className="mid">
                <div className="sel">
                    <select 
                        className="course-12" 
                        name="course"
                        value={selectedCourse}
                        onChange={handleCourseChange}
                        required
                    >
                        <option value="">--Course--</option>
                        {courses.map((course, index) => (
                            <option key={index} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>
                </div>
                {role==="official"?
                (<div className="add">
                    <button className="add-btn" onClick={() => {
                        navigate('/Dashboard/Subject');
                    }}>ADD SUBJECTS</button>
                </div>):""
                }
            </div>

            <div className="exam-content">
                {data.length > 0 ? (
                    data.map((subject, index) => (
                        <div key={index} className="exam">
                            <p className="exam1">EXAM NAME: {subject.subName}</p>
                            <p className="exam1">TIMING: {subject.time}{subject.timeUnit}</p>
                            <p className="exam1">DEPT: {subject.course}</p>
                            <button className='show' onClick={()=>{
                                navigate(`/Dashboard/Show/${subject.subName}`)
                            }} style={role !== "official" ? { marginLeft: '50px', width: '90px' } : {}}>Show</button>
                            {role==="official"?(<button className="add_que"  onClick={()=>{
                                 navigate(`/Dashboard/que/${subject.subName}`)
                            }}>add questions</button>):""}
                        </div>
                    ))
                ) : (
                    <p className='no'>No subjects available</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
