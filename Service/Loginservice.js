import {client,dbname1} from '../Model/index.js';
import auth from '../auth/auth.js';
import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com', 
    port: 587,              
    secure: false,  
    auth: {
        user:process.env.USER,
        pass:process.env.PSWD
    }
});
const email_verify1 = async (req, res) => {
    await client.connect();
    try {
        console.log("hi");
        let db = client.db(dbname1);
        console.log(req.body.email);
        let data = await db.collection('userdetails').findOne({ email: req.body.email });
        console.log(data);
        let email=req.body.email;
        if (data) {
            let str = crypto.randomBytes(16).toString('hex');
            let link = `http:/localhost:5173/Login/Forgot1/password1/${str}`;
            await db.collection('userdetails').updateMany({email}, { $set: { String:`${str}` } });
            await transport.sendMail({
                from: process.env.USER,
                to: req.body.email,
                subject: 'Password Reset',
                text: `Click the link to reset your password: ${link}`
            });
            res.status(200).send({ message: 'Reset email sent' });
        } else {
            res.status(400).send({ message: 'Invalid email' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const email_verify2 = async (req, res) => {
    await client.connect();
    try {
        console.log("hi");
        let db = client.db(dbname1);
        let data = await db.collection('officialsdetails').findOne({ email: req.body.email });
        let email=req.body.email;
        if (data) {
            let str = crypto.randomBytes(16).toString('hex');
            let link = `https:/reacturl15.netlify.app/Admin/Forgot2/password2/${str}`;
            await db.collection('officialsdetails').updateMany({email}, { $set: { String:`${str}` } });
            await transport.sendMail({
                from: process.env.USER,
                to: req.body.email,
                subject: 'Password Reset',
                text: `Click the link to reset your password: ${link}`
            });
            res.status(200).send({ message: 'Reset email sent' });
        } else {
            res.status(400).send({ message: 'Invalid email' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    } 
}
const for_user_pass = async (req, res) => {
    await client.connect();
    try {
        const token = req.body.str;
        let db = client.db(dbname1);
        console.log(token);
        console.log(req.body.password);
        console.log(req.body.con_password);     
        let data = await db.collection('userdetails').findOne({ String: token });
        console.log(data);
        if ((data) && (req.body.password=== req.body.con_password)) {
            let hashedPassword =  await auth.encrypt(req.body.password);
            await db.collection('usserdetails').updateMany({ String: token }, { $set: { password: hashedPassword } });
            res.status(200).send({
                message: "Password reset is successful"
            });
        } else {
            res.status(400).send({
                message: "Invalid token"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message 
        });
    } 
};
const for_official_pass = async (req, res) => {
    await client.connect();
    try {
        const token = req.body.str;
        let db = client.db(dbname1);
        let data = await db.collection('officialsdetails').findOne({ String: token });
        if ((data) && (req.body.password=== req.body.con_password)) {
            let hashedPassword =  await auth.encrypt(req.body.password);
            await db.collection('officialsdetails').updateMany({ String: token }, { $set: { password: hashedPassword } });
            res.status(200).send({
                message: "Password reset is successful"
            });
        } else {
            res.status(400).send({
                message: "Invalid token"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message 
        });
    } 
};

const login = async (req, res) => {
    try {
        await client.connect();
        let db = client.db(dbname1);
        console.log(req.body.email);
        let data = await db.collection("userdetails").findOne({ email: req.body.email });
        if (data) {
            const passwordMatch = await auth.compare(req.body.password, data.password);
            if (passwordMatch) {
                let payload = {
                    _id: data._id,
                    Name: data.name,
                    email: data.email,
                    role: data.role
                };
                let token = auth.createToken(payload);
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    id:data._id,
                    Name:data.name,
                    role: data.role,
                });
            } else {
                res.status(400).send({
                    message: 'Password wrong'
                });
            }
        } else {
            res.status(500).send({
                message: "Invalid email"
            });
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || 'Internal server error'
        });
    }
}

const create_login = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { name, email, password, con_password, age, state, degree,course,yop,role } = req.body;
        if (password !== con_password) {
            res.status(400).send({
                message: "Passwords do not match"
            });
            return;
        }

        const hashedPassword = await auth.encrypt(password);

        await db.collection("userdetails").insertOne({
            name,
            email,
            password: hashedPassword,
            age,
            state,
            degree,
            course,
            yop,
            role
        });

        res.status(200).send({
            message: 'Account created successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}

const offl_login = async (req, res) => {
    try {
        await client.connect();
        let db = client.db(dbname1);
        console.log(req.body.email);
        let data = await db.collection("officialsdetails").findOne({ email: req.body.email });
        if (data) {
            const passwordMatch = await auth.compare(req.body.password, data.password);
            if (passwordMatch) {
                let payload = {
                    _id: data._id,
                    Name: data.Name,
                    email: data.email,
                    role: data.role,
                };
                let token = auth.createToken(payload);
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    id:data._id,
                    role: data.role
                });
            } else {
                res.status(400).send({
                    message: 'Password wrong'
                });
            }
        } else {
            res.status(500).send({
                message: "Invalid email"
            });
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || 'Internal server error'
        });
    } 
}

const create_offllogin = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { name, email,age, password, con_password} = req.body;
        if (password !== con_password) {
            res.status(400).send({
                message: "Passwords do not match"
            });
            return;
        }

        const hashedPassword = await auth.encrypt(password);

        await db.collection("officialsdetails").insertOne({
            name,
            email,
            password: hashedPassword,
            age,
            role: 'official'
        });

        res.status(201).send({
            message: 'Account created successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}

 const get_user=async(req,res)=>{
     try{
        await client.connect();
         let data;
         let{name}=req.query;
         console.log(name);
         const db = client.db(dbname1);
         let payload=await db.collection("userdetails").find({name:name}).toArray();
         res.status(200).send({
              message:"data fetched successfull",
             data:payload
         })
     }
     catch(err){
         res.status(500).send({
             message: err.message || 'Internal server error'
         });
     }
 }
 const edit_user = async (req, res) => {
    try {
        await client.connect();
        const old_name = req.body.old_name;
        const { name, age, state, course, degree, yop, role } = req.body;
        const db = client.db(dbname1);
        const payload = await db.collection("userdetails").updateOne(
            { name: old_name },  
            { 
                $set: {
                    name: name,
                    age: age,
                    state: state,
                    course: course,
                    degree: degree,
                    yop: yop,
                    role: role
                }
            }
        );

        res.status(200).send({
            message: "Data edited successfully",
            data: payload
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
};

export default{
    login,
    create_login,
    offl_login,
    create_offllogin,
    email_verify1,
    email_verify2,
    for_official_pass,
    for_user_pass,
    get_user,
    edit_user
}
