import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    allUserCount: 0,
    subscribedCount: 0,
}

export const getStatsData = createAsyncThunk("stat/getdata", async () => {
    try {
        const response = axiosInstance.get("/admin/stats/users")
        toast.promise(response, {
            loading: "loading stats",
            success: (data) => {
                return data.data.message || "Stats data loaded "
            },
            errror: "Failed to load stats data"
        })
        return (await response).data
    } catch (error) {
        toast.error(error.payload?.data.message || "Unable to get stats data right now !")
    }
})

const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

    }
})

export default statSlice.reducer