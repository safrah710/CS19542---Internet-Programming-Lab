import {client,dbname1} from '../Model/index.js';
const add_res = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { User,name,per} = req.body;
        await db.collection("Result_details").insertOne({
            Name:User,
            subName:name,
            Percentage:per    
        });
        res.status(200).send({
            message: 'Result added successfully successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
const show_res = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        let {Name}=req.query;
        console.log("jvnoneboinb4oin4obi4n4oi")
        console.log(Name);
        let payload=await db.collection("Result_details").find({Name:Name}).toArray()
        console.log(payload);
        res.status(200).send({
            message: 'Results are retrieved successfully',
            data:payload
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
const show_res3 = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        let payload=await db.collection("Result_details").find().toArray()
        console.log(payload);
        res.status(200).send({
            message: 'Results are retrieved successfully',
            data:payload
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
const show_res1 = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        let {Name,subname}=req.query;
        console.log(Name);
        console.log(subname);
        let payload=await db.collection("Result_details").find({Name:Name,subName:subname}).toArray()
        console.log(payload);
        res.status(200).send({
            message: 'Results are retrieved successfully',
            data:payload
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
export default {
    add_res,
    show_res,
    show_res1,
    show_res3

}