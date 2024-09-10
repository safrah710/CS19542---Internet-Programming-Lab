import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/UseLogout';

function Viewres() {
    let navigate = useNavigate();
    let { name } = useParams();
    let { per } = useParams(); 
    let User = sessionStorage.getItem('name');
    let logout = useLogout();

    const add_res = async () => {
        try {
            let res = await axios.post('https://examination-portal-nhe6.onrender.com/res/add_res', { User, name, per });
            if (res.status === 200) {
                toast.success("Your result has been added");
            }
        } catch (err) {
            toast.error("Error adding result");
        }
    };

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
                            <p className="new-logo" onClick={() => {
                                navigate('/Dashboard');
                            }}>HOME</p>
                            <p className="new-logo" onClick={() => {
                                logout();
                            }}>LOGOUT</p>
                        </div>
                    </div>
                </div>
                <div className="exam-content-1"> 
                    <div className="exam-new2">
                        <p className="exam3">RESULT ANALYSIS</p>
                        <p className="exam3">STUDENT NAME: {User}</p>
                        <p className="exam2_new">EXAM NAME: {name}</p>
                        {isNaN(per) ? (
                            <p className="exam2_new">YOUR SCORE WILL BE: 0%</p>
                        ) : (
                            <p className="exam2_new">YOUR SCORE WILL BE: {per}%</p>
                        )}

                        <p className="exam3_new">1. PRESS OK FOR NO ATTEMPT (*FOR CERTIFICATE SCORE MUST BE MORE THAN 50)</p>
                        <p className="exam3_new">2. PRESS TRY FOR ANOTHER ATTEMPT (*ATTEMPT CAN BE TAKEN AT ANY TIME)</p>

                        <div className="but_view">
                            {isNaN(per) ? (
                                <button 
                                    className="add_que_new" 
                                    style={{ marginLeft: '140px' }} 
                                    onClick={() => {
                                        navigate('/Dashboard');
                                    }}>
                                    TRY (ANOTHER ATTEMPT)
                                </button>
                            ) : (
                                <button className="add_que_new" onClick={() => {
                                    navigate('/Dashboard');
                                }}>
                                    TRY (ANOTHER ATTEMPT)
                                </button>
                            )}

                            {!isNaN(per) && (
                                <button className="add_que_new" onClick={() => {
                                    add_res();
                                    navigate('/Dashboard');
                                }}>
                                    OK
                                </button>
                            )}
                        </div>  
                    </div>
                </div>
            </div>
        </>
    );
}

export default Viewres;
