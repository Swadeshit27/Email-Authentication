import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import { deleteOnCloudinary, uploadOnCloudinary } from '../utils/Cloudinary';
import { mailer } from '../helpers/mailler';

interface RequestWithUser extends Request {
    userId?: string;
}

export const Register = async (req: Request, res: Response) => {
    try {
        const { username, name, email, password } = req.body;
        const isUsernameExist = await User.findOne({ username });
        if (isUsernameExist) {
            return res.status(409).json({ message: "Username already exist" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Email already exist" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // save to database
        const newUser = await User.create({ username, name, email, password: hashPassword });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);
        return res.status(201).json({ user: newUser, token, message: "Register successful" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(404).json({ message: "Incorrect password" });
        }
        if (!user.isVerified) return res.status(200).json({ message: "User is not verified" });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
        return res.status(201).json({ user, token, message: "login successful" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const uploadProfile = async (req: RequestWithUser, res: Response) => {
    try {
        const { location } = req.body;
        const path = req.file?.path;
        // console.log(path);
        if (!path) return res.status(404).json("Profile photo is not exist");
        const imgUrl = await uploadOnCloudinary(path);
        // console.log(imgUrl)
        if (!imgUrl) return res.status(400).json("Error while uploading profile");
        const user = await User.findById(req?.userId);
        if (!user) return res.status(404).json("User not exist");
        const updateUser = await User.findByIdAndUpdate(user._id, {
            $set: {
                photo: {
                    url: imgUrl.url,
                    public_id: imgUrl.public_id
                },
                location
            }
        }, { new: true })
        // console.log(updateUser);
        if (user.photo?.public_id && updateUser?.photo?.public_id) {
            await deleteOnCloudinary(user.photo?.public_id);
        }
        res.json({ details: updateUser, message: "Photo uploaded successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
}

export const updateInterest = async (req: RequestWithUser, res: Response) => {
    try {
        const interest = req.body;
        console.log(req.body);
        const { userId } = req;
        console.log(userId);
        await User.findByIdAndUpdate(userId, { $set: { interests: interest } }, { new: true })
        res.status(200).json({ message: "Interest updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
}

export const sendVerificationLink = async (req: RequestWithUser, res: Response) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json("User not exist");
        const { email } = user;
        await mailer({ email, emailType: "VERIFY", userId });
        res.status(201).json({ message: "Verification link has send successfully" });
    } catch (error: any) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

export const VerifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({
            verificationToken: token,
        });
        if (!user) {
            return res.status(400).json("Invalid token");
        }
        user.isVerified = true;
        // user.verificationToken = undefined;
        // user.verificationTokenExpire = undefined;
        await user.save();
        return res.status(201).json({ message: "email verified successful" });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
}