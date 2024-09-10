import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useLogout from '../hooks/UseLogout';
import { useNavigate } from 'react-router-dom';

function Showsubject() {
  
    let navigate = useNavigate();
    let logout=useLogout();
    let { name } = useParams();  
    let [data, setData] = useState([]);
    let role = sessionStorage.getItem('role');
    let[but,setBut]=useState(true);
    let [showMessage, setShowMessage] = useState(false);

    const getdata = async () => {
        let params = { subname: name };
        try {
            let res = await axios.get('https://examination-portal-nhe6.onrender.com/sub/get_subinfo', { params });
            if (res.status === 200) {
                setData(res.data.data);
                //console.log(res.data.data);
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
                navigate('/Dashboard');
            }
        } catch (error) {
            toast.error("Error deleting subject");
        }
    };

    const show_res = async (params) => {
        try {
            let res = await axios.get('https://examination-portal-nhe6.onrender.com/res/show_res1', { params });
            if (res.status === 200) {
                let Data = res.data.data;
                if(Data){
                     setBut(false);
                }
            }
        } catch (err) {
            toast.error("Error fetching results");
        }
    };
    

    useEffect(() => {
        getdata();
        
    }, []);
    useEffect(() => {
        if (data.length > 0) {
            let Name = sessionStorage.getItem('name');
            let subname = data[0].subName;
            let params = { Name, subname };
            show_res(params);
        }
    }, [data]);

    return (
        <>
        <div className='new5'>
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
        <div className="exam-content-2">
            {data.map((subject, index) =>(
                <div key={index} className="exam-new6">
                    <p className="exam3">EXAM DETAILS</p>
                    <p className="exam2">EXAM NAME: {subject.subName}</p>
                    <p className="exam2">TIMING: {subject.time} {subject.timeUnit}</p>
                    <p className="exam2">DEPT: {subject.course}</p>        
                    <p className="exam2">SYLLABUS: {subject.syllabus}</p>
                    {role !== "official" ? (
                        <button className="add_que-1" onClick={() => {
                            setShowMessage(true);
                        }}>ATTEND EXAM</button>
                    ) : (
                        <button className="add_que-1" onClick={() => {
                            delete1(subject.subName);
                        }}>DELETE EXAM</button>
                    )}
                </div>
            ))}
                        {showMessage && (
                <div style={messageBoxStyle}>
                    <div style={messageContentStyle}>
                        <p className="msg">ARE SURE TO ATTEMPT THE EXAM!</p>
                        <div style={{display:'flex',gap:'20px'}}>
                        <button 
                    className="but-msg" 
                    onClick={() => navigate(`/Dashboard/show/answer/${name}?time=${data[0].time}&timeUnit=${data[0].timeUnit}`)}>
                    YES
                      </button>
                        <button className="but-msg" onClick={() => setShowMessage(false)}>NO</button>
                        </div>
                     
                    </div>
                </div>
            )}
        </div>
        </div>
        </>
    );
}
const messageBoxStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

const messageContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    border: '1px solid orange'
};

export default Showsubject;
