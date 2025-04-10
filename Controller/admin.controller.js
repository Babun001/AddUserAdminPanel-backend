import { AdminDatas } from "../Models/admin.models.js";

const adminRegister = async(req,res) =>{
    const {phoneNumber, password} = req.body;
    
    const isNumeric = /^\d+$/.test(phoneNumber);
    if(!isNumeric ){
        return res.status(400).send("Phone number must contain only digits.");
    }

    const createAdminData = await AdminDatas.create({
        phoneNumber: phoneNumber,
        password:password
    })
    if(!createAdminData){
        return res.status(400).json({message:"Failed to save data!"});
    }
    res
    .status(200)
    .json({
        status:"Admin Created Successfully!"
    })
    
}

const adminLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        if (!phoneNumber || !password) {
            return res.status(400).send("Enter valid credentials!");
        }
    
        const presentUser = await AdminDatas.findOne({ phoneNumber });
    
        if (!presentUser) {
            return res.status(400).send("User not found!");
        }
    
        if (password === presentUser.password) {
            return res.status(200).send("Password matched");
        }
    
        return res.status(401).send("Incorrect password!");
    } catch (error) {
        return res.status(401).send("LoginApi Error: ",error);
    }
};



export {
    adminRegister,
    adminLogin
}