import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: {}
}

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load data!");
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchasecourse", async () => {
    try {
        const res = await axiosInstance.post("/payments/subscribe");
        console.log(res);
        return (await res).data;
    } catch (error) {
        toast.error(error.response?.data.message || "unable to by this course right now !")
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const res = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })
        return res.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Unable to verify payment")
    }
})

export const getPaymentRecord = createAsyncThunk("payments/records",async() => {
    try {
        const res = axiosInstance.get("/payments?count=100")
        toast.promise(res,{
            loading : "getting records ....",
            success : (response) =>{
                return response?.data.message || "Here is the list"
            },
            error : "Failed to get list !"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Unable to get records right now !")
    }
})

export const cancelCourseBundle = createAsyncThunk("cancelPurchaseCourse",async()=>{
    try {
        const response =  axiosInstance.post("/payments/unsubscribe")
        toast.promise(response,{
            loading : "subsctiption cancelation is in process ...",
            success : (data) => {
                return data.data?.message || "subscription cancelled successfully"
            },
            error : " Failed to cancel, try again later !"
        })
        return (await response).data;
    } catch (error) {
        toast.error("unable to cancel subsription right now !")
    }
})

const razorpaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayId.fulfilled,(state,action) => {
            state.key = action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action) => {
            state.subscription_id = action?.payload?.subscription_id
        })
        .addCase(verifyUserPayment.fulfilled,(state,action) => {
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected,(state,action) => {
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled,(state,action) => {
            state.allPayments = action?.payload?.allPayments
            state.finalMonths = action?.payload?.finalMonths
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
        })
     }
})

export default razorpaySlice.reducer;