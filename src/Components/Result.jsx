import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Showsubject() {
    let navigate=useNavigate();
    let { name } = useParams();  
    let [data, setData] = useState([]);
    let role=sessionStorage.getItem('role');

    const getdata = async () => {
        let params = { subname: name };
        try {
            let res = await axios.get('https://examination-portal-nhe6.onrender.com/sub/get_subinfo', { params });
            if (res.status === 200) {
                setData(res.data.data);
            }
        } catch (error) {
            toast.error("Data fetching error");
        }
    };
    const delete1 = async (subjectName) => {
        try {
            let res = await axios.delete(`https://examination-portal-nhe6.onrender.com/sub/delete_sub`, { params: { subname: subjectName } });
            if (res.status === 200) {
                toast.success("Subject deleted successfully!");
                navigate('/Dashboard')
            }
        } catch (error) {
            toast.error("Error deleting subject");
        }
    };

    


    useEffect(() => {
        getdata()
    
    });

    return (
        <>
        <div className='new5'>
        <div className="p5">
                        <marquee width="90%" direction="right" height="50px">
                            <p className="p4">WELCOME TO EXAMINATION PORTAL</p>
                        </marquee>
                    </div>
        <div className="exam-content-1">
        
                    {data.map((subject, index) =>(
                        <div key={index} className="exam-new">
                            <p className="exam3">EXAM DETAILS</p>
                            <p className="exam2">EXAM NAME: {subject.subName}</p>
                            <p className="exam2">TIMING: {subject.time} {subject.timeUnit}</p>
                            <p className="exam2">DEPT: {subject.course}</p>        
                            <p className="exam2">INFO:{subject.description}</p>
                            <p className="exam3">RULES</p>
                            <p className="exam2">1.Arrange for stable Internet connectivity.</p>    
                            <p className="exam2">2.Login to the portal 10 min before the online examination start time.</p>
                            <p className="exam2">3.Close all browsers/tabs before starting the online examination.</p>
                            <p className="exam2">4 Its a proctored examination so donot move to next tab while writing an examination </p>    
                            {role!="official"?(<button className="add_que1" onClick={()=>{
                                navigate(`/Dashboard/show/answer/${subject.subName}`)
                            }}>ATTEND EXAM</button>):(<button className="add_que1" onClick={()=>{
                                delete1(subject.subName)
                            }}>DELETE EXAM</button>)}
                            </div>
                    ))}
            </div>
        </div>
        </>
    );
}
export default Showsubject;
