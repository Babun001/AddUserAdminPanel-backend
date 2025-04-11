import { UserData } from "../Models/user.model.js"

const createNewUser = async (req, res) => {
    const { userName,password } = req.body;

    if (!userName) {
        return res.status(400).send("Invalid userName!");
    }
    if(!password){
        return res.status(400).send("Enter correct password!");
    }

    try {
        const existsUser = await UserData.findOne({ userName :userName.toLowerCase() });

        if (existsUser) {
            return res.status(400).send("User already exists");
        }

        const create_new_user = await UserData.create({
             userName: userName.toLowerCase(),
             password:password
            });

        if (!create_new_user) {
            return res.status(500).send("Failed to create user");
        }

        res.status(200).send("User created successfully!");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

const fetchUserData = async (req, res) => {
    try {
        const userdata = await UserData.find();

        if (!userdata || userdata.length === 0) {
            return res.status(200).json({ data: [], message: "No users found." });
        }

        res.status(200).json({ data: userdata });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const userLogin = async (req, res) => {
    const { userName,password } = req.body;
    
    if (!userName) {
        return res.status(400).send("Invalid userName!");
    }
    if(!password){
        return res.status(400).send("Enter correct password!");
    }
    try {
        const existsUser = await UserData.findOne({userName:userName.toLowerCase()});

        if(!existsUser){
            return res.status(400).send("User Not Found!");
        }

        if(existsUser.password !== password){
            return res.status(400).send("Enter correct password!");
        }
        res.status(200).json({userName:existsUser.userName})
        
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const addMoneyToUser = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ message: "Invalid amount." });
    }

    try {
        const user = await UserData.findOne({ userName: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.balance += numericAmount;
        await user.save();

        res.status(200).json({
            message: `₹${numericAmount} added successfully.`,
            updatedBalance: user.balance,
        });
    } catch (error) {
        console.error("Error adding money:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const withdrawMoneyFromUser = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ message: "Invalid amount." });
    }

    try {
        const user = await UserData.findOne({ userName: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.balance < numericAmount) {
            return res.status(400).json({ message: "Insufficient balance." });
        }

        user.balance -= numericAmount;
        await user.save();

        res.status(200).json({
            message: `₹${numericAmount} withdrawn successfully.`,
            updatedBalance: user.balance,
        });
    } catch (error) {
        console.error("Error withdrawing money:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getSingleUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserData.findOne({ userName: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export {
    createNewUser,
    fetchUserData,
    addMoneyToUser,
    withdrawMoneyFromUser, 
    getSingleUser, 
    userLogin
}