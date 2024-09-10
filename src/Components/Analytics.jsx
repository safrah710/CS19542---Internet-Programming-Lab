import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useLogout from '../hooks/UseLogout';

function Analytics() {
    let logout = useLogout();
    let navigate = useNavigate();
    let name = sessionStorage.getItem('name');
    let params = { Name: name };
    let role = sessionStorage.getItem('role');
    let [data, setData] = useState([]);
    let [currentRes, setCurrentRes] = useState(null); 
    let [isVisible, setIsVisible] = useState(false); 
    const show_res = async () => {
        try {
            let res = await axios.get('https://examination-portal-nhe6.onrender.com/res/show_res', { params });
            if (res.status === 200) {
                let data = res.data.data;
                setData(data);
            }
        } catch (err) {
            toast.error("error");
        }
    };
    const show_res3 = async () => {
        try {
            let res = await axios.get('https://examination-portal-nhe6.onrender.com/res/show_res3');
            if (res.status === 200) {
                let data = res.data.data;
                setData(data);
            }
        } catch (err) {
            toast.error("error");
        }
    };

    useEffect(() => {
        if (role === 'official') {
            show_res3();
        } else {
            show_res();
        }
    }, []);

    const certificateRef = useRef(null);

    const downloadCertificate = (res) => {
        setCurrentRes(res); 
        setIsVisible(true); 

        setTimeout(() => {
            const input = certificateRef.current;
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('landscape', 'pt', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 820, 500);
                pdf.save(`${res.Name}_certificate.pdf`);
                setIsVisible(false); 
            });
        }, 500); 
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
                            <p className="new-logo" onClick={() => navigate('/Dashboard')}>HOME</p>
                            <p className="new-logo" onClick={logout}>LOGOUT</p>
                        </div>
                    </div>
                </div>
                {data.length === 0 ? (
                    <p className='no'>No Results available</p>
                ) : (
                    <div className="exam-content-1">
                        {data.map((res, e) => (
                            <div className="exam-new3" key={e}>
                                <div className='cont'>
                                    <div>
                                        <p className="exam2_new_3">NAME: {res.Name}</p>
                                        <p className="exam2_new_3">SUB NAME: {res.subName}</p>
                                        <p className="exam2_new_3">YOUR SCORE WILL BE: {res.Percentage}</p>
                                        <p className="exam2_new_3">CERTIFICATE STATUS: {Number(res.Percentage) >= 50 ? "YES" : "NO"}</p>
                                    </div>
                                    <div>
                                        {role !== "official" && Number(res.Percentage) >= 50 && (
                                            <button
                                                className="get-certificate-button"
                                                onClick={() => downloadCertificate(res)}
                                            >
                                                GET CERTIFICATE
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {currentRes && (
                <div style={{ display: isVisible ? 'block' : 'none' }}>
                    <div ref={certificateRef} style={certificateStyle}>
                        <h1 style={{ fontFamily: 'Georgia', color: '#4A90E2', fontSize: '36px', fontWeight: 'bold' }}>Hack Puyals Private Limited</h1>
                        <h2 style={{ fontFamily: 'Georgia', color: '#4A90E2', fontSize: '28px', fontWeight: 'bold' }}>Certificate of Achievement</h2>
                        <p style={{ fontFamily: 'Georgia', fontSize: '16px', marginTop: '20px' }}>Presented to</p>
                        <h2 style={{ fontFamily: 'Brush Script MT', color: '#333', fontSize: '26px', margin: '10px 0' }}>{currentRes.Name}</h2>
                        <p style={{ fontFamily: 'Georgia', fontSize: '16px', marginBottom: '30px' }}>For successfully completing the {currentRes.subName} examination with a score of</p>
                        <h2 style={{ fontFamily: 'Arial', fontSize: '24px', margin: '10px 0', color: '#E94E77' }}>{currentRes.Percentage}%</h2>
                        <p style={{ fontFamily: 'Georgia', fontSize: '14px', marginBottom: '40px' }}>Congratulations on your achievement!</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '0 20px' }}>
                            <div>
                                <p style={{ fontFamily: 'Arial', fontSize: '14px' }}>Hackuyals Private Limited</p>
                                <p style={{ fontFamily: 'Arial', fontSize: '12px', marginTop: '10px' }}>Date Completed: {new Date().toLocaleDateString()}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <img
                                    src='../../sign.jpg' 
                                    alt="Leader Signature"
                                    style={{ width: '120px', marginTop: '10px' }}
                                />
                                <p style={{ fontFamily: 'Arial', fontSize: '14px' }}>Leader: Safeekur Rahman</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const certificateStyle = {
    width: '720px',
    height: '480px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#FFF8E7', 
    border: '6px solid #DAA520',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
};

export default Analytics;
