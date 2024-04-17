
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userSlice {
    token: string,
    user: {
        userId: string;
        email: string;
        isVerify: boolean;
        photo: string | File | null,
        location: string,
        interests: string[],
    }
}

type photoType = {
    photo: File | null,
    location: string,
}
type registerType = {
    token: string,
    userId: string,
    email: string
}

const initialState: userSlice = {
    token: "",
    user: {
        userId: "",
        email: "",
        isVerify: false,
        photo: null,
        location: "",
        interests: [],
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser: (state, action: PayloadAction<registerType>) => {
            // console.log(action.payload);
            const { token, userId, email } = action.payload;
            state.user.userId = userId;
            state.user.email = email;
            state.user.isVerify = false;
            state.token = token;
        },
        uploadPhoto: (state, action: PayloadAction<photoType>) => {
            const { location, photo } = action.payload;
            state.user.photo = photo;
            state.user.location = location;
        },
        updateVerify: (state) => {
            state.user.isVerify = true;
        },
        UpdateInterest: (state, action: PayloadAction<string[]>) => {
            state.user.interests = action.payload;
        },
        loginUser: (state, action) => {
            const { userId, email, isVerify, photo, location, interests } = action.payload
            state.user = { userId, email, isVerify, photo, location, interests };
            state.token = action.payload.token;
        },
        logOutUser: (state) => {
            state.token = "";
            state.user = {
                userId: "",
                email: "",
                isVerify: false,
                photo: null,
                location: "",
                interests: [],
            };
        },
    },
})

export const { logOutUser, registerUser, uploadPhoto, UpdateInterest, updateVerify } = userSlice.actions;

export default userSlice.reducer;
