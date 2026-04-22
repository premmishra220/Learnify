import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelCourseBundle } from "../../Redux/Slices/RazorPaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userDetails = useSelector((state) => state?.auth?.data);

  async function handleSubscriptionCancelation() {
    e.preventDefault();
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Subscription cancelled  ! 😭");
    navigate("/");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="my-10 flex flex-col gap-4 justify-center align-center rounded-lg p-4 text-white w-96 shadow-[0_0_10px_0_black]">
          <img
            src={userDetails?.avatar?.secure_url}
            alt="user profile picture"
            className="w-40 rounded-full m-auto border border-black "
          />
          <h1 className="text-xl font-bold text-center capitalize">
            {userDetails?.fullName}
          </h1>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2">
            <p>name : </p>
            <p>{userDetails?.email}</p>
            <p>role : </p>
            <p>{userDetails?.role}</p>
            <p>subscription : </p>
            <p>
              {userDetails?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex align-center justify-between gap-2">
            <Link
              to="/user/changepassword"
              className="w-5/12 bg-yellow-500 py-2 rounded-md font-semibold cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 text-center"
            >
              Change password
            </Link>
            <Link
              to="/user/profile/edit"
              className="w-5/12 bg-yellow-500 py-2 rounded-md font-semibold cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 text-center"
            >
              Edit Profile
            </Link>
          </div>
          {userDetails?.subscription?.status === "active" && (
            <button onClick={handleSubscriptionCancelation}
              className="w-full bg-red-500 py-2 rounded-md font-semibold cursor-pointer hover:bg-red-600 transition-all ease-in-out duration-300 text-center">
              cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default UserProfile;
