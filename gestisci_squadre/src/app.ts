import express  from "express";
import { Mongoose } from "mongoose";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from "./api/routes";

const app =express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api',router);

export default app; 