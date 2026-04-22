import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures: [],
}

export const getcourseLecture = createAsyncThunk("/course/lecture/get", async (courseId) => {
    try {
        const res = axiosInstance.get(`courses/${courseId}`);
        toast.promise(res, {
            loading: "Getting lectures",
            success: (response) => {
                return response?.data?.message || "Lectures loadded successfully"
            },
            error: "Unable to fetch lectures of this course !"
        })
        return (await res).data
    } catch (error) {
        toast.error(error.response?.data?.message || "unable to get the course lectures right now !");
    }
})

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture)
        formData.append("title", data.title)
        formData.append("description", data.description)

        const res = axiosInstance.post(`/courses/${data.id}`, formData)
        toast.promise(res, {
            loading: "It may take some time , Please wait ...",
            success: (response) => {
                return response.data.message || "Lecutre uploaded successfully "
            },
            error: "Failed to upload the lecture !"
        })
        return (await res).data;

    } catch (error) {
        toast.error(error.response?.data.message || "Unable to add lectures right now !")
    }
})

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {
        const res = axiosInstance.post(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)
        toast.promise(res, {
            loading: "Delete request procced",
            success: (response) => {
                return response?.data.message || "Lecture deleted successfully"
            },
            error: "Failed to delete the Lecture"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error.response?.data?.message || "unable to delete the lecture right now !")
    }
})

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getcourseLecture.fulfilled, (state, action) => {
                state.lectures = action?.payload?.lectures
            })
            .addCase(addCourseLecture.fulfilled,(state,action) => {
                state.lectures = action?.payload?.course?.lectures
            })
            .addCase(deleteCourseLecture.fulfilled,(state,action) => {
                state.lectures = action.payload?.course?.lectures
            })
    }
}
);

export default lectureSlice.reducer;