import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as axios } from "axios";
import { BASE_URL } from "../constants";

const initialState = {
    assets: [],
}

export const fetchAssets = createAsyncThunk("asset/fetchAssets", async ({ name, category, price, page }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.TOKEN;
    const url = `${BASE_URL}/asset/get-assets?name=${name}&category=${category}&price=${price}`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: error.message || "Login failed" });
    }
}
);

const assetSlice = createSlice({
    name: "asset",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.assets = action.payload.data;
            })
    }
})

export default assetSlice.reducer;