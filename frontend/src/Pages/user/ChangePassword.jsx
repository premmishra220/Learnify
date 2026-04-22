import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false); // For toggling newPassword visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For toggling confirmPassword visibility

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        oldPassword : "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    async function handleFormSubmit(e) {
        e.preventDefault();


        // Validation for matching passwords
        if (userDetails.newPassword !== userDetails.confirmNewPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);

            const response = await dispatch(
                changePassword({
                    oldPassword : userDetails.oldPassword,
                    newPassword: userDetails.newPassword,
                })
            );

            setIsLoading(false);
            if (response.payload?.success) {
                navigate("/");
            } 
    }

    return (
        <HomeLayout>
            <div className="h-[100vh] flex justify-center items-center">
                <form
                    className="flex flex-col gap-5 justify-center items-center h-96 w-96 shadow-[0_0_10px_0_black] rounded-lg border-separate"
                    onSubmit={handleFormSubmit}
                >
                    <div className="flex gap-5 justify-center items-center relative">
                        <label htmlFor="oldPassword" className="font-semibold text-lg">
                            Old Password:
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="old Password"
                            id="oldPassword"
                            name="oldPassword"
                            value={userDetails.oldPassword}
                            onChange={handleUserInput}
                            className="bg-transparent py-1 px-2 border border-gray-500 rounded-md"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                        </button>
                    </div>
                    <div className="flex gap-5 justify-center items-center relative">
                        <label htmlFor="newPassword" className="font-semibold text-lg">
                            New Password:
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New Password"
                            id="newPassword"
                            name="newPassword"
                            value={userDetails.newPassword}
                            onChange={handleUserInput}
                            className="bg-transparent py-1 px-2 border border-gray-500 rounded-md"
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            className="absolute right-2"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                        </button>
                    </div>
                    <div className="flex gap-5 justify-center items-center relative">
                        <label htmlFor="confirmNewPassword" className="font-semibold text-lg">
                            Confirm Password:
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={userDetails.confirmNewPassword}
                            onChange={handleUserInput}
                            className="bg-transparent py-1 px-2 border border-gray-500 rounded-md"
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            className="absolute right-2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <BsEyeSlash size={20} />
                            ) : (
                                <BsEye size={20} />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 px-5 py-2 mt-5 rounded-md font-semibold text-lg text-white cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;
