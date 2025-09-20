import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as axios } from "axios";
import { BASE_URL } from "../constants";
import toast from "react-hot-toast";

const initialState = {
    assets: {},
    assetData: {}
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
        return rejectWithValue({ message: error.message || "Forbidden" });
    }
}
);

export const uploadAssets = createAsyncThunk("asset/uploadAssets", async (data, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.TOKEN;
    const url = `${BASE_URL}/asset/upload`;
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        data.image.forEach((file) => {
            formData.append("assetImage", file);
        });

        const response = await axios.post(url,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                state.assets = action.payload.data.assets;
                state.assetData = action.payload.data
            })
            .addCase(uploadAssets.fulfilled, (state, action) => {
                toast.success(action.payload?.message);
            })
            .addCase(uploadAssets.rejected, (state, action) => {
                toast.error(action.payload?.message);
            })
    }
})

export default assetSlice.reducer;