import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";

import toast from "react-hot-toast";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
function EditUserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userPreviousDetails = useSelector((state) => state?.auth?.data);

    const [userCurrentDetails, setUserCurrentDetails] = useState({
        fullName: userPreviousDetails?.fullName,
        email: userPreviousDetails?.email,
        role: userPreviousDetails?.role,
        userId: userPreviousDetails?._id,
        avatar: userPreviousDetails?.avatar?.secure_url,
    });

    const [previewImage, setPreviewImage] = useState(
        userPreviousDetails?.avatar?.secure_url
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if (uploadedImage && ["image/jpeg", "image/png", "image/jpg"].includes(uploadedImage.type)) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
                setUserCurrentDetails({
                    ...userCurrentDetails,
                    avatar: uploadedImage,
                });
            };
        } else {
            toast.error("Invalid file type. Please upload a .jpg, .png, or .jpeg file.");
        }
    };

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserCurrentDetails({
            ...userCurrentDetails,
            [name]: value,
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (!userCurrentDetails.fullName || !userCurrentDetails.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if (userCurrentDetails.fullName.length < 3) {
            toast.error("Name cannot be less than 3 characters");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", userCurrentDetails.fullName);
        formData.append("avatar", userCurrentDetails.avatar);

        setIsLoading(true);
        const result = await dispatch(updateProfile([userCurrentDetails.userId, formData]));
        setIsLoading(false);

        if (result?.payload?.success) {
            await dispatch(getUserData());
            navigate("/user/profile");
        }
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-semibold">
                        Edit your profile
                    </h1>
                    <label htmlFor="image_uploads" className="w-28 h-28 m-auto">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="profile pic"
                                className="w-28 h-28 m-auto rounded-full cursor-pointer"
                            />
                        ) : (
                            <BsPersonCircle className="w-28 h-28 m-auto rounded-full cursor-pointer" />
                        )}
                    </label>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .png, .jpeg, .heic"
                    />

                    <div className="flex flex-row flex-wrap justify-between gap-5">
                        <label htmlFor="fullName" className="text-lg font-semibold">
                            Full name:
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={userCurrentDetails.fullName}
                            onChange={handleInputChange}
                            className="py-2 px-3 border bg-transparent"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className="flex flex-row flex-wrap justify-between gap-5">
                        <label htmlFor="email" className="text-lg font-semibold">
                            Email:
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={userCurrentDetails.email}
                            className="py-2 px-3 border bg-transparent cursor-not-allowed"
                            placeholder="email"
                            required
                            disabled
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default EditUserProfile;
