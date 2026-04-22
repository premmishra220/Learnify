import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { verifyUserPayment,getRazorpayId,purchaseCourseBundle } from "../../Redux/Slices/RazorPaySlice";
import { BiRupee } from "react-icons/bi";
import { useEffect } from "react";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetils = useSelector((state) => state?.auth?.data);
 
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }


    async function handleSubscription(event) {
        event.preventDefault();
        console.log("Function called to buy the subscription")
        console.log("Razorpay key : ", razorpayKey);
        console.log("Razorpay subscription id : ", subscription_id);
        if (!razorpayKey || !subscription_id) {
            toast.error("Something wents wrong !");
            return;
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            amount : "9900",
            currency : "INR",
            name: "LMS by Golu kumar",
            description: "Course subscription purhase",
            theme: {
                color: "#37254"
            },
            prefill: {
                name: userDetils.fullName,
                email: userDetils.email
            },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;

                toast.success("Payment successfull !");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                console.log(res)
                res?.payload?.success ? navigate('/checkout/success') : navigate('/checkout/failed');
            }
        }
        const paymentObject = new Razorpay(options);
        paymentObject.open();
    }

    async function load(){
        await dispatch(getRazorpayId());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() =>{
        load();
    },[])

    return (
        <HomeLayout>
            <form className="flex items-center justify-center min-h-[90vh] text-white "
                onSubmit={handleSubscription}>
                <div className="flex flex-col items-center justify-center gap-4 w-80 h-[26rem] shadow-[0_0_10px_0_black] rounded-lg relative">
                    <h1 className="bg-yellow-600 font-semiboldtext-xl absolute top-0 w-full text-center py-2 rounded-md">1 step to make this yours</h1>
                    <div className="px-4 text-center mt-2 space-y-5">
                        <p className="text-[17px]">This purchase will allow you to access all the available courses on this platform for {" "}
                            <span className="text-yellow-500 font-bold">1 year duration </span> {" "}
                            All the existing and new launched courses will also be available for you.
                        </p>
                        <p className="flex items-center justify-center text-3xl gap-1">
                            <BiRupee /><span>499</span> {"     "} Only
                        </p>
                        <div className="space-y-2 flex items-center flex-col text-gray-400 justify-center ">
                            <p>100 % refund on Cancellation </p>
                            <p>*Terms and condition applied</p>
                        </div>

                        <button type="submit " className="bg-yellow-500 px-6 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    )
}

export default Checkout;