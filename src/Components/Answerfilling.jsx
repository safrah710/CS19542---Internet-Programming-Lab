import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/UseLogout';

function Showsubject() {
    let navigate = useNavigate();
    let { name } = useParams();
    let [data, setData] = useState([]);
    let [ind, setInd] = useState(0);
    let [selectedAnswers, setSelectedAnswers] = useState([]);  
    let [tot, setTot] = useState([]);  
    let [showMessage, setShowMessage] = useState(false);  
    let [min, setMin] = useState(0);
    let [sec, setSec] = useState(0);
    let [hr, setHr] = useState(0);

    const params = new URLSearchParams(window.location.search);
    const time = params.get('time');
    const timeUnit = params.get('timeUnit');
    let logout = useLogout();

    const getdata = async () => {
        let params = { subname: name };
        try {
            let res = await axios.get('https://examination-portal-nhe6.onrender.com/que/show_que', { params });
            if (res.status === 200) {
                setData(res.data.data);
            }
        } catch (error) {
            toast.error("Data fetching error");
        }
    };

    const check_Ans = (ind, ans) => {
        let arr = [...tot]; 
        if (data[ind].Answer === ans) {
            arr[ind] = 1; 
        } else {
            arr[ind] = 0; 
        }
        setTot(arr);
    };

    const handleTimeUp = () => {
        let sum = tot.reduce((acc, curr) => acc + curr, 0);
        let mark = sum / data.length;
        let percentage = mark * 100;

        toast.success('Time is up! Redirecting to result page...');
        navigate(`/Dashboard/show/answer/viewres/${name}/${percentage}`);
    };

    
    const handleTabLeave = () => {
        if (document.hidden) {
            toast.error('You left the tab! The exam will be ended.');
            handleTimeUp();  
        }
    };

    useEffect(() => {
        getdata();
    }, [name]);

    useEffect(() => {
    
        document.addEventListener('visibilitychange', handleTabLeave);

        const timer = setInterval(() => {
            setSec((prevSec) => {
                if (prevSec === 59) {
                    setMin((prevMin) => {
                        if (timeUnit === 'min' && prevMin + 1 === parseInt(time)) {
                            clearInterval(timer);
                            handleTimeUp();
                            return prevMin;
                        }
                        if (prevMin === 59) {
                            setHr((prevHr) => {
                                if (timeUnit === 'hr' && prevHr + 1 === parseInt(time)) {
                                    clearInterval(timer);
                                    handleTimeUp();
                                    return prevHr;
                                }
                                return prevHr + 1;
                            });
                            return 0;
                        }
                        return prevMin + 1;
                    });
                    return 0;
                } else {
                    return prevSec + 1; 
                }
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', handleTabLeave);
        };
    }, [timeUnit, time]);

    useEffect(() => {
        let arr = new Array(data.length).fill(0); 
        setTot(arr);
    }, [data.length]);

    const handleAnswerChange = (choice) => {
        let updatedAnswers = [...selectedAnswers];
        updatedAnswers[ind] = choice;
        setSelectedAnswers(updatedAnswers);
        setShowMessage(false);  
    };

    const handleNextQuestion = () => {
        if (selectedAnswers[ind] !== undefined) {
            check_Ans(ind, selectedAnswers[ind]); 
            setInd(ind + 1); 
        } else {
            setShowMessage(true);  
        }
    };

    const handleSubmission = () => {
        check_Ans(ind, selectedAnswers[ind]);

        let sum = tot.reduce((acc, curr) => acc + curr, 0);
        let mark = sum / data.length;
        let percentage = mark * 100;

        toast.success('Submission successful!');
        navigate(`/Dashboard/show/answer/viewres/${data[ind].Name}/${percentage}`);
    };

    const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

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
                            <p className="new-logo" onClick={() => logout()}>LOGOUT</p>
                        </div>
                    </div>
                </div>
                <div className='timer'>
                    {timeUnit === 'min' ? (
                        <p className="tim-1">TIMER: {addLeadingZero(min)}:{addLeadingZero(sec)}</p>
                    ) : (
                        <p className="tim-2">TIMER: {addLeadingZero(hr)}:{addLeadingZero(min)}:{addLeadingZero(sec)}</p>
                    )}
                </div>
                <div className="exam-content-1">
                    <div className="exam-new">
                        {data.length > 0 && (
                            <>
                                <p className="exam2">Question {ind + 1}: {data[ind].Question}</p>

                                <div className='choice'>
                                    <input
                                        type="radio"
                                        name={`question-${ind}`}
                                        value={data[ind].Choice1}
                                        checked={selectedAnswers[ind] === data[ind].Choice1}
                                        onChange={() => handleAnswerChange(data[ind].Choice1)}
                                    />
                                    <p className="exam2">{data[ind].Choice1}</p>
                                </div>

                                <div className='choice'>
                                    <input
                                        type="radio"
                                        name={`question-${ind}`}
                                        value={data[ind].Choice2}
                                        checked={selectedAnswers[ind] === data[ind].Choice2}
                                        onChange={() => handleAnswerChange(data[ind].Choice2)}
                                    />
                                    <p className="exam2">{data[ind].Choice2}</p>
                                </div>

                                <div className='choice'>
                                    <input
                                        type="radio"
                                        name={`question-${ind}`}
                                        value={data[ind].Choice3}
                                        checked={selectedAnswers[ind] === data[ind].Choice3}
                                        onChange={() => handleAnswerChange(data[ind].Choice3)}
                                    />
                                    <p className="exam2">{data[ind].Choice3}</p>
                                </div>

                                {ind < data.length - 1 ? (
                                    <button className="add_que1" onClick={handleNextQuestion}>
                                        NEXT
                                    </button>
                                ) : (
                                    <button className="add_que1" onClick={handleSubmission}>
                                        Confirm Submission
                                    </button>
                                )}

                                {ind > 0 && (
                                    <button className="add_que2" onClick={() => setInd(ind - 1)}>
                                        Previous
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showMessage && (
                <div style={messageBoxStyle}>
                    <div style={messageContentStyle}>
                        <p className="msg">Please select an answer before proceeding!</p>
                        <button className="but-msg" onClick={() => setShowMessage(false)}>OK</button>
                    </div>
                </div>
            )}
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
