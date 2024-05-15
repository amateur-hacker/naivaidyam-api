import bcrypt from "bcryptjs";
import { missingFieldsErrorMsg } from "../utils/index.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;
    if (!(fullname && username && password)) {
      return res.errorResponse({
        message: missingFieldsErrorMsg({ fullname, username, password }),
      });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.errorResponse({
        message: `Username '${username}' already exist`,
      });
    }

    const user = await User.create({
      fullname,
      username,
      password,
    });

    console.log(user);
    res.successResponse({
      message: `User ${user.username} signed up successfully.`,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.errorResponse({
        message: missingFieldsErrorMsg({ username, password }),
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.errorResponse({
        message: "User doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.errorResponse({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, { httpOnly: true });
    res.successResponse({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw new Error(error.message);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("authToken");

    res.successResponse({
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("Error occurred during logout:", error);
    throw new Error(error.message);
  }
};
