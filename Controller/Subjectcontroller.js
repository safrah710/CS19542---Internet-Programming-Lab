import express from 'express';
import Subjectservice from '../Service/Subjectservice.js';
const Subjectcontroller=express.Router();
Subjectcontroller.post('/add_sub',Subjectservice.create_sub);
Subjectcontroller.get('/get_sub',Subjectservice.get_sub);
Subjectcontroller.get('/get_subinfo',Subjectservice.get_subinfo);
Subjectcontroller.delete('/delete_sub',Subjectservice.delete_sub);
export default Subjectcontroller;