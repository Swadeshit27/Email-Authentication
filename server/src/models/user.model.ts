import mongoose, { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        url: String,
        public_id: String,
    },
    location: String,
    interests: Array,
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpire: Date,
}, { timestamps: true });

type user = InferSchemaType<typeof userSchema>;
const User = mongoose.model<user>('User', userSchema);
export default User;