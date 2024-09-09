import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function Setpass() {
    const [password, setPassword] = useState("");
    const [con_password, setcon_Password] = useState("");
    const { str } = useParams(); 
    const navigate = useNavigate(); 

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (password !== con_password) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('https://examination-portal-nhe6.onrender.com/login/forofficial', {
                password,
                con_password,
                str
            });

            if (response.status === 200) {
                toast.success("Password changed successfully");
                navigate('/'); 
            } else {
                toast.error(response.data.message || "Failed to change password");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <div className="new1">
                <h1 className="head">
                    <marquee width="60%" direction="right" height="100px">
                        WELCOME TO EXAMINATION PORTAL
                    </marquee>
                </h1>
                <div className="form1">
                    <p className="p1">CHANGING PASSWORD</p>
                    <form onSubmit={handlePasswordChange}>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                            className="input1"
                            required
                            placeholder="Password"
                        />
                        <br />
                        <br />
                        <input
                            value={con_password}
                            onChange={(e) => setcon_Password(e.target.value)}
                            name="con_password"
                            className="input2"
                            type="password"
                            maxLength="8"
                            required
                            placeholder="Confirm Password"
                        />
                        <button type="submit" className="logbtn">
                            CHANGE PASSWORD
                        </button>
                        <br />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Setpass;
