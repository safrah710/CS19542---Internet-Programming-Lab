import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useLogout from '../hooks/Uselogout';
import { useNavigate } from 'react-router-dom';

function Guidelines() {
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
            let res = await axios.delete(`http://localhost:10000/sub/delete_sub`, { params: { subname: subjectName } });
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
            let res = await axios.get('http://localhost:10000/res/show_res1', { params });
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
                <div  className="exam-new7">
                <p className="exam3">RULES</p>
                    <p className="exam2">1. Ensure a stable and reliable internet connection is available before the exam.</p>    
                    <p className="exam2">2.Log in to the portal at least 10 minutes prior to the scheduled start time of the online examination.</p>
                    <p className="exam2">3.Close all other browsers and tabs before beginning the online examination.</p>
                    <p className="exam2">4. This is a proctored exam. Please avoid switching tabs or moving away from the exam screen during the examination.</p>
                    <p className="exam2">5. The questions will be based on the syllabus provided, and will assess your understanding of key topics..</p>
                    <p className="exam2">6. The exam will consist of 15 to 25 multiple-choice questions (MCQs), and you must complete the exam within the allotted time frame..</p>
                </div>
        </div>
        </div>
        </>
    );
}


export default Guidelines;
