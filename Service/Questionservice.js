import {client,dbname1} from '../Model/index.js';
const add_que = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { name,que,cho1,cho2,cho3,ans } = req.body;
        let col=`${name}_detals`
        await db.collection(col).insertOne({
            Name:name,
            Question:que,
            Choice1:cho1,
            Choice2:cho2,
            Choice3:cho3,
            Answer:ans
        });

        res.status(200).send({
            message: 'question added successfully successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
const show_que = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        let {subname}=req.query;
        let col=`${subname}_detals`
        console.log(col);
        console.log(subname);
        let payload=await db.collection(col).find({Name:subname}).toArray()
        console.log(payload);
        res.status(200).send({
            message: 'questions are retrieved successfully',
            data:payload
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
export default {
    add_que,
    show_que
}