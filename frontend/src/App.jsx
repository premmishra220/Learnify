import { Routes, Route } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";

import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import UserProfile from "./Pages/user/UserProfile";
import EditUserProfile from "./Pages/user/EditUserProfile";
import ChangePassword from "./Pages/user/ChangePassword";

import CourseList from "./Pages/Course/CourseList";
import CourseDescription from "./Pages/Course/CourseDescription";
import CreateCourse from "./Pages/Course/CreateCourse";

import Checkout from "./Pages/Payment/Checkout";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFailed from "./Pages/Payment/CheckoutFailed";

import DisplayLectures from "./Pages/Dashboard/displayLectures";
import AddLecture from "./Pages/Dashboard/AddLecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";

import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* User Routes */}
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/profile/edit" element={<EditUserProfile />} />
      <Route path="/user/changepassword" element={<ChangePassword />} />

      {/* Payment */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/failed" element={<CheckoutFailed />} />

      {/* Lectures */}
      <Route path="/course/displaylectures" element={<DisplayLectures />} />

      {/* Protected Admin Routes */}
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/course/addlecture" element={<AddLecture />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;