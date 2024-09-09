import express from 'express';
import Resultservice from '../Service/Resultservice.js';
const Resultcontroller=express.Router();
Resultcontroller.post('/add_res',Resultservice.add_res);
Resultcontroller.get('/show_res',Resultservice.show_res);
Resultcontroller.get('/show_res1',Resultservice.show_res1);
Resultcontroller.get('/show_res3',Resultservice.show_res3);
export default Resultcontroller;