import mongoose from "mongoose";

const dbConnection = async() =>{
    try {
        // console.log(process.env.DB_LINK);
        // console.log(process.env.DB_NAME);
        
        const connectionLink = await mongoose.connect(`${process.env.DB_LINK}/${process.env.DB_NAME}`)
        console.log(`DataBase is connected!! Hosted at : ${connectionLink.connection.host}`);
        

    } catch (error) {
        console.error("error in db connection: ", error);
        process.exit(1);
    }
}

export default dbConnection;