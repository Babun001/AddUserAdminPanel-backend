import express from 'express';
import cors from 'cors';



const app = express();

app.use(express.json());
app.use(cors({
    origin:'*'
}))
app.use(express.urlencoded({ extended: true }));


import router from '../Routes/Routers.route.js';
app.use('/v1/api', router);


export default app;