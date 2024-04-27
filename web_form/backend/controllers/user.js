import { User } from "../models/user.js";

//simple setter
export const setUser = async (req, res) => {                    
    const { name, age, gender } = req.body;
    try {
        const user = await User.findOne ({ name });
        console.log(user);
        if (user && user.name === name && user.age === parseInt(age)) {
            console.log("User with same name and age already exists");
            return res.status(400).json({ error: "User with same name and age already exists" });
        }        

        const newUser = await User.create({ name, age, gender });
        console.log("user created: " + newUser.name);
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.log("user not created", error.message);
        return res.status(500).json({ error: error.message });
    }
}

//simple getter
export const getUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        console.log("details of user with id " + id + " sent");
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//simple authenticator
export const authenticateUser = async (req, res) => {
    const { name, age } = req.body;
    try {
        console.log("Authenticating user: " + name);
        const ageInt = parseInt(age);
        const user = await User.findOne({ name, age: ageInt });
        if (!user) {
            console.log("User does not exist");
            return res.status(400).json({ error: "User does not exist" });
        }
        console.log("user authenticated");
        return res.status(200).json(user);
    }
    catch (error) {
        console.log("user not authenticated", error.message);
        return res.status(500).json({ error: error.message });
    }
}