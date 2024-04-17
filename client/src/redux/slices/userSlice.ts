
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type photoType = {
    photo: File | null,
    location: string,
}
type registerType = {
    token: string,
    username: string,
    name: string,
    email: string
}
type interestType = {
    title: string,
    id: number,
}
interface userSlice {
    token: string,
    user: {
        username: string,
        name: string,
        email: string;
        isVerify: boolean;
        photo: string | File | null,
        location: string,
        interests: interestType[],
    }
}

const initialState: userSlice = {
    token: "",
    user: {
        username: "",
        name: "",
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
            const { username, name, token, email } = action.payload;
            state.user.name = name;
            state.user.username = username;
            state.user.email = email;
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
        UpdateInterest: (state, action: PayloadAction<interestType[]>) => {
            state.user.interests = action.payload;
        },
        loginUser: (state, action) => {
            const { name, username, email, token, photo, location, interests } = action.payload;
            state.user.name = name;
            state.user.username = username;
            state.user.email = email;
            state.user.photo = photo;
            state.user.isVerify = true;
            state.user.location = location;
            state.user.interests = interests;
            state.token = token;
        },
        logOutUser: (state) => {
            state.token = "";
            state.user = {
                username: "",
                name: "",
                email: "",
                isVerify: false,
                photo: null,
                location: "",
                interests: [],
            };
        },
    },
})

export const { logOutUser, loginUser, registerUser, uploadPhoto, UpdateInterest, updateVerify } = userSlice.actions;

export default userSlice.reducer;
