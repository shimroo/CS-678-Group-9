import { User } from "../models/user.js";

//Sign Up Page              Tested
export const addUser = async (req, res) => {                     //adds a user to the database
    const { name, username, password } = req.body;
    try {
        const user = await User.findOne ({ username });
        console.log(user);
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await User.create({ name, username, password });
        console.log(newUser + " created");
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.log("user not created");
        return res.status(500).json({ error: error.message });
    }
}

//Used in multiple Pages    Tested
export const getUser = async (req, res) => {                        //gets a user info from the database
    const { username } = req.body;
    try {
        const user = await User .findOne ({ username });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getName = async (req, res) => {                        //gets a user name from the database
    const { username } = req.body;
    try {
        const user = await User .findOne ({ username });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        console.log(user.name);
        return res.status(200).json(user.name);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Login Page                Tested
export const authenticateUser = async (req, res) => {               //authenticates a user
    const { username, password } = req.body;
    try {
        const user = await User .findOne ({ username });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        if (user.password != password) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Change Password           Tested
export const changePassword = async (req, res) => {                 //changes a user's password
    const { username, password, new_password } = req.body;
    try {
        const user = await User .findOne ({ username });
        if (!user) {
            console.log("user does not exist" + username);
            return res.status(400).json({ error: "User does not exist" });
        }
        if (user.password != password) {
            console.log("incorrect password");
            return res.status(205).json({ error: "Incorrect password" });
        }
        if (user.password == new_password) {
            console.log("new password must be different");
            return res.status(400).json({ error: "New password must be different" });
        }
        if (!new_password) {
            console.log("new password cannot be empty");
            return res.status(400).json({ error: "New password cannot be empty" });    
        }
        user.password = new_password;
        await user.save();
        console.log("password changed");
        return res.status(200).json(user);
    }
    catch (error) {
        console.log("password not changed");
        return res.status(500).json({ error: error.message });
    }
}
