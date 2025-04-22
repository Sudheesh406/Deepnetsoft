const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const menuRoute = require('./routers/menuRoute')

const databaseCn = require('./database/db');
const cors = require('cors')

app.use(cors({
   origin: process.env.FRONTEND_URL,
   credentials: true, 
 }));
 
app.use(cookieParser());
app.use(express.json());
app.use('/',menuRoute)

databaseCn();

app.listen(process.env.PORT,(err)=>{
    if(err){
       console.error(err);
    }else{
    console.log('server running successfully...');
    }
 })