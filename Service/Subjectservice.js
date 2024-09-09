import {client,dbname1} from '../Model/index.js';
const create_sub = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { subName, time, timeUnit, course, syllabus } = req.body;
        await db.collection("Subject_details").insertOne({
            subName, time, timeUnit, course, syllabus
        });

        res.status(200).send({
            message: 'Subject added successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
const get_sub = async (req, res) => {
    try {
        let {course}=req.query;
        await client.connect();
        const db = client.db(dbname1);
        let payload= await db.collection("Subject_details").find({course:course}).toArray();
        res.status(200).send({
            message: 'data retrieved successfully',
            data:payload  
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
const get_subinfo = async (req, res) => {
    try {
        let {subname}=req.query;
      
        await client.connect();
        const db = client.db(dbname1);
        let payload= await db.collection("Subject_details").find({subName:subname}).toArray();
   
        res.status(200).send({
            message: 'data retrieved successfully',
            data:payload  
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    } 
}
const delete_sub = async (req, res) => {
    try {
        let { subname } = req.query; 
        await client.connect();
        const db = client.db(dbname1);
        const result = await db.collection("Subject_details").deleteOne({ subName: subname });

        if (result.deletedCount === 1) {
            res.status(200).send({
                message: `Subject '${subname}' deleted successfully`
            });
        } else {
            res.status(404).send({
                message: `Subject '${subname}' not found`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
export default {create_sub,get_sub,get_subinfo,delete_sub}