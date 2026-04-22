import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../Redux/Slices/CourseSlice";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleImageInput(e) {
    e.preventDefault();
    const uploadedImage = e.target?.files?.[0];
    if (uploadedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("category", userInput.category);
    formData.append("createdBy", userInput.createdBy);
    formData.append("description", userInput.description);
    formData.append("thumbnail", userInput.thumbnail);
    formData.append("previewImage", userInput.previewImage);
  
    try {
      const response = await dispatch(createCourse(formData)).unwrap(); // Use unwrap to access payload
      if (response.success) {
        navigate("/courses");
        setUserInput({
          title: "",
          category: "",
          createdBy: "",
          description: "",
          thumbnail: null,
          previewImage: "",
        });
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  }  

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center gap-5 rounded-lg p-4 text-white w-[700px] shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 left-6 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft className="text-3xl text-orange-600 hover:text-orange-500 hover:scale-110 hover:font-bold 
            transition-all ease-in-out duration-300"
            onClick={() => navigate(-1)}
            />
          </Link>
          <h1 className="text-center text-2xl font-bold">
            Create a new course
          </h1>
          <main className="grid grid-cols-2 gap-x-10 mt-3">
            <div className="gap-y-10">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border rounded-lg"
                      src={userInput.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex flex-col items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                      <h3>(less than 6MB)</h3>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg , .jpeg , .png"
                  onChange={handleImageInput}
                  name="image_uploads"
                />
              </div>
              <div className="flex  flex-col gap-1 pt-14">
                <label className="text-lg font-semibold" htmlFor="title">
                  course title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter your title here..."
                  className="bg-transparent px-2 py-1 border rounded-md"
                  value={userInput.title}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="instructor" className="text-lg font-semibold">
                course instructor name
              </label>
              <input
                type="text"
                name="createdBy"
                id="instructor"
                className="bg-transparent px-2 py-1 border rounded-md"
                value={userInput.createdBy}
                onChange={handleUserInput}
                required
              />
              <label htmlFor="category" className="text-lg font-semibold">
                course category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className="bg-transparent px-2 py-1 border rounded-md"
                value={userInput.category}
                onChange={handleUserInput}
                required
              />
              <label htmlFor="description" className="text-lg font-semibold">
                course description
              </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                className="bg-transparent px-2 py-1 border rounded-md"
                value={userInput.description}
                onChange={handleUserInput}
                required
              />
            </div>
          </main>

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 w-9/12 py-2 rounded-lg"
          >
            Create course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
export default CreateCourse;
