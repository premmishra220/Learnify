import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
    courseData: []
};

// GET ALL COURSES
export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses");

        toast.promise(response, {
            loading: "Loading courses data",
            success: "Courses data loaded successfully",
            error: "Failed to load courses data"
        });

        const data = await response;

        // FIXED HERE (important)
        return data?.data?.data; 

    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
});

//  CREATE COURSE
export const createCourse = createAsyncThunk("/course/create", async (userData) => {
    try {
        const res = axiosInstance.post("/courses", userData);

        toast.promise(res, {
            loading: "Creating course, please wait...",
            success: (data) => {
                return data?.data?.message || "Course created successfully";
            },
            error: "Failed! Something went wrong"
        });

        return (await res).data;

    } catch (error) {
        toast.error(error?.response?.data?.message || "Error creating course");
        throw error;
    }
});

// DELETE COURSE
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`/courses/${id}`);

        toast.promise(res, {
            loading: "Deleting course...",
            success: (data) => {
                return data?.data?.message || "Deleted successfully";
            },
            error: "Delete failed"
        });

        return (await res).data;

    } catch (error) {
        toast.error(error?.response?.data?.message || "Error deleting course");
        throw error;
    }
});

// 
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = action.payload;
            }
        });
    }
});

export default courseSlice.reducer;