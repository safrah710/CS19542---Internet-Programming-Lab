import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/UseLogout';
function Addquestion() {
   let [que,setQue]=useState("");
   let[cho1,setCho1]=useState("");
   let[cho2,setCho2]=useState("");
   let[cho3,setCho3]=useState("");
   let[ans,setAns]=useState("");
   let {name}=useParams();
   let navigate=useNavigate();
   let logout=useLogout();
   const add1=async()=>{
      try{
        let res=await axios.post("https://examination-portal-nhe6.onrender.com/que/add_que",{name,que,cho1,cho2,cho3,ans})
        if(res.status===200){
          toast.success("Question added succesfully");
          setQue("");
          setCho1("");
          setCho2("");
          setCho3("");
          setAns("");
        }
      }
      catch(err){
        console.log("errorr");      }
   }
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
        <div className="main1">
          <div className="form-new">
            <p className="short">ADD QUESTION SECTION</p>
            <textarea
            rows="5" 
              cols="30"
              type="text"
              name="name"
              className="input3"
              placeholder="question "
               value={que} 
              onChange={(e) => setQue(e.target.value)} 
              required
            />
            <br />
            <input
              type="text"
              name="cho1"
              className="input4"
              placeholder="choice 1"
              value={cho1} 
               onChange={(e) => setCho1(e.target.value)} 
              required
            />
            <br />
            <input
              type="text"
              className="input5"
              name="cho2"
              placeholder="choice 2"
               value={cho2}
               onChange={(e) => setCho2(e.target.value)} 
              required
            />
            <br />
            <input
            type="text"
            name="cho3"
            className="input10"
            placeholder="choice 3"
            value={cho3}
            onChange={(e) => setCho3(e.target.value)} 
            required
          />
          <br />
            <input
            type="text"
            name="ans"
            className="input10"
            placeholder="Answer "
            value={ans} 
             onChange={(e) => setAns(e.target.value)}
            required
          />
          <div></div>
          <button className="add-new" onClick={() => {
            add1()
          }}>
            ADD 
          </button>
          <button className="add-new1" onClick={() => {
            navigate('/Dashboard');
          }}>
            FINISH
          </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addquestion;
