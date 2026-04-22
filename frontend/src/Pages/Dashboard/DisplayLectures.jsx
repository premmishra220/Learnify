import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCourseLecture, getcourseLecture } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    const { role } = useSelector((state) => state.auth);
    const { lectures } = useSelector((state) => state.lecture);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        if (window.confirm("Are you sure you want to delete this lecture?")) {
            await dispatch(deleteCourseLecture({ courseId, lectureId }));
            await dispatch(getcourseLecture(courseId));
        }
    }

    useEffect(() => {
        if (!state) navigate("/courses");
        else dispatch(getcourseLecture(state._id));
    }, [dispatch, navigate, state]);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 mx-[5%] text-white">
                <div className="text-center text-4xl font-bold text-yellow-500 mb-5">
                    {state?.title || "Course Lectures"}
                </div>

                {lectures && lectures.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-10 w-full">
                        <div className="flex flex-col w-full md:w-1/2 lg:w-7/12 rounded-lg shadow-lg bg-gray-800">
                            <video
                                src={lectures[currentVideo]?.lecture?.secure_url}
                                className="w-full rounded-t-lg"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            ></video>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-yellow-500">
                                    {lectures[currentVideo]?.title}
                                </h2>
                                <p className="text-sm mt-2">
                                    {lectures[currentVideo]?.description || "No description available."}
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-4/12 p-4 rounded-lg shadow-lg bg-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-yellow-500">Lectures List</h3>
                                {role === "ADMIN" && (
                                    <button
                                        onClick={() => navigate("/course/addlecture", { state })}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-semibold"
                                    >
                                        Add Lecture
                                    </button>
                                )}
                            </div>

                            <ul className="space-y-3 overflow-y-auto max-h-96">
                                {lectures.map((lecture, idx) => (
                                    <li key={lecture._id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                                        <span
                                            className="cursor-pointer hover:underline"
                                            onClick={() => setCurrentVideo(idx)}
                                        >
                                            Lecture {idx + 1}: {lecture?.title}
                                        </span>
                                        {role === "ADMIN" && (
                                            <button
                                                onClick={() => onLectureDelete(state._id, lecture._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg">No lectures available.</p>
                        {role === "ADMIN" && (
                            <button
                                onClick={() => navigate("/course/addlecture", { state })}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-semibold mt-4"
                            >
                                Add Lecture
                            </button>
                        )}
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}

export default DisplayLectures;
