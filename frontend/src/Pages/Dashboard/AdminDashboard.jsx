import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
  } from "chart.js";
  import { useEffect } from "react";
  import { Bar, Pie } from "react-chartjs-2";
  import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
  import { FaUsers } from "react-icons/fa";
  import { FcSalesPerformance } from "react-icons/fc";
  import { GiMoneyStack } from "react-icons/gi";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  
  import HomeLayout from "../../Layouts/HomeLayout";
  import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
  import { getPaymentRecord } from "../../Redux/Slices/RazorPaySlice";
  import { getStatsData } from "../../Redux/Slices/StatsSlice";
  
  ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);
  
  function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { allUsersCount, subscribedCount } = useSelector((state) => state.stats);
    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);
  
    const userData = {
      labels: ["Registered User", "Enrolled User"],
      datasets: [
        {
          label: "User Details",
          data: [allUsersCount, subscribedCount],
          backgroundColor: ["#facc15", "#4ade80"],
          borderWidth: 1,
        },
      ],
    };
  
    const salesData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Sales / Month",
          data: monthlySalesRecord,
          backgroundColor: "#f87171",
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  
    const myCourses = useSelector((state) => state?.course?.courseData);
  
    async function onCourseDelete(id) {
      if (window.confirm("Are you sure you want to delete the course?")) {
        const res = await dispatch(deleteCourse(id));
        if (res?.payload?.success) {
          await dispatch(getAllCourses());
        }
      }
    }
  
    useEffect(() => {
      (async () => {
        await dispatch(getAllCourses());
        await dispatch(getStatsData());
        await dispatch(getPaymentRecord());
      })();
    }, [dispatch]);
  
    return (
      <HomeLayout>
        <div className="min-h-[90vh] pt-5 flex flex-col gap-10 text-white">
          <h1 className="text-center text-5xl font-semibold text-yellow-500">
            Admin Dashboard
          </h1>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
            {/* User Statistics */}
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-5">User Statistics</h2>
              <Pie data={userData} />
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-yellow-500 p-4 rounded-md text-center shadow-md">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-3xl font-bold">{allUsersCount}</h3>
                </div>
                <div className="bg-green-500 p-4 rounded-md text-center shadow-md">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-3xl font-bold">{subscribedCount}</h3>
                </div>
              </div>
            </div>
  
            {/* Sales Statistics */}
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-5">Monthly Sales</h2>
              <Bar data={salesData} />
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-yellow-500 p-4 rounded-md text-center shadow-md">
                  <p className="font-semibold">Total Subscriptions</p>
                  <h3 className="text-3xl font-bold">{allPayments?.count}</h3>
                </div>
                <div className="bg-green-500 p-4 rounded-md text-center shadow-md">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-3xl font-bold">${allPayments?.count * 499}</h3>
                </div>
              </div>
            </div>
          </div>
  
          {/* Courses Overview */}
          <div className="mx-10 bg-gray-800 p-6 shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Courses Overview</h2>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md"
                onClick={() => navigate("/course/create")}
              >
                Create New Course
              </button>
            </div>
            <table className="table-auto w-full text-white">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2">S No</th>
                  <th className="px-4 py-2">Course Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Instructor</th>
                  <th className="px-4 py-2">Lectures</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCourses?.map((course, idx) => (
                  <tr key={course._id} className="odd:bg-gray-800 even:bg-gray-700">
                    <td className="px-4 py-2 text-center">{idx + 1}</td>
                    <td className="px-4 py-2 text-center">{course.title}</td>
                    <td className="px-4 py-2 text-center">{course.category}</td>
                    <td className="px-4 py-2 text-center">{course.createdBy}</td>
                    <td className="px-4 py-2 text-center">{course.numberOfLectures}</td>
                    <td className="px-4 py-2 text-center truncate">{course.description}</td>
                    <td className="px-4 py-2 flex justify-center gap-4">
                      <button
                        className="bg-green-500 hover:bg-green-600 p-2 rounded-md"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <BsCollectionPlayFill className="text-white text-xl" />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-md"
                        onClick={() => onCourseDelete(course._id)}
                      >
                        <BsTrash className="text-white text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </HomeLayout>
    );
  }
  
  export default AdminDashboard;
  