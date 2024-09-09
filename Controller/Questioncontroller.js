import express from 'express';
import Questionservice from '../Service/Questionservice.js';
const Questioncontroller=express.Router();
Questioncontroller.post('/add_que',Questionservice.add_que);
Questioncontroller.get('/show_que',Questionservice.show_que);
export default Questioncontroller;