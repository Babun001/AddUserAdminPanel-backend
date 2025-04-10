import dotenv from 'dotenv';
dotenv.config({
    path:'./src/.env'
})

import app from './app.js';
import dbConnection from '../db/database.connection.js';

dbConnection();


try {
    app.listen(process.env.PORT, () =>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
        
    })
} catch (error) {
    console.error(`Error in server connection`);
}

