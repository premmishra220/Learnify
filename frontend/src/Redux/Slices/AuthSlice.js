import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

// ✅ SAFE LOCAL STORAGE PARSE
const getLocalData = () => {
    try {
        const data = localStorage.getItem('data');
        return data && data !== "undefined" ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
};

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === "true",
    role: localStorage.getItem('role') || "",
    data: getLocalData()
};

export const createAccount = createAsyncThunk("/auth/register", async (data) => {
    try {
        const res = axiosInstance.post("auth/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/user/login", async (data) => {
    try {
        const res = axiosInstance.post("auth/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/user/logout", async () => {
    try {
        const res = await axiosInstance.get("auth/logout");
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`auth/update`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("auth/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.response?.data.message);
    }
})

export const changePassword = createAsyncThunk("/user/changepassword", async (data) => {
    try {
        const res = axiosInstance.put("/auth/changepassword", data);
        toast.promise(res, {
            loading: "Updating password...",
            success: (response) => {
                return response?.data?.message || "Password changed successfully";
            },
            error: "Failed to update password"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to change the password right now");
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", "true"); // ✅ FIXED
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            // ✅ SAFE REMOVE
            localStorage.removeItem("data");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");

            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;

            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        });
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;