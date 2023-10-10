import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Received data:", { username, email, password });

    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser);

    res.status(201).json("User Created Successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json("Error creating user");
  }
};
