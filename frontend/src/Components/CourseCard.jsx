import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/course/description/", { state: { ...data } })}
            className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
        >
            <div className="overflow-hidden">
                <img
                    className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-110 transition-all ease-in-out duration-300"
                    
                    // ✅ fallback image fix
                    src={data?.thumbnail?.secure_url || "https://via.placeholder.com/300"}
                    
                    alt="course thumbnail"
                />

                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-orange-500 line-clamp-2">
                        {data?.title || "No Title"}
                    </h2>

                    <p className="line-clamp-2">
                        {data?.description || "No Description"}
                    </p>

                    <p className="font-semibold">
                        <span className="text-orange-500 font-bold">Category : </span>
                        {data?.category || "N/A"}
                    </p>

                    <p className="font-semibold">
                        <span className="text-orange-500 font-bold">Total lectures : </span>
                        {data?.noOfLectures || 0}
                    </p>

                    <p className="font-semibold">
                        <span className="text-orange-500 font-bold">Instructor : </span>
                        {data?.createdBy || "Unknown"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;