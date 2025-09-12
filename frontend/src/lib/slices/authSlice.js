import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as axios } from "axios";
import { BASE_URL } from "../constants";
import toast from "react-hot-toast";

const initialState = {
    IS_LOGGED_IN: false,
    TOKEN: "",
}

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: error.message || "Login failed" });
    }
}
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.IS_LOGGED_IN = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.TOKEN = action.payload.data;
                state.IS_LOGGED_IN = true;
            })
            .addCase(login.rejected, (state, action) => {
                toast.error(action.payload?.message);
            })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;