import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice.js'
import RazorPaySliceReducer from "./Slices/RazorPaySlice.js";
import lectureSliceReducer from "./Slices/LectureSlice.js"
import statsSliceReducer from "./Slices/StatsSlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay : RazorPaySliceReducer,
        lecture : lectureSliceReducer,
        stats : statsSliceReducer
    },
    devTools: true
})

export default store;