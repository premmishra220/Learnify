import { useState } from "react";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if (!isEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            // ✅ FIX HERE
            const response = axiosInstance.post("/auth/contact", userInput);

            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form",
            });

            const contactResponse = await response;

            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }

        } catch (err) {
            console.log(err);
            toast.error("Operation failed.");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh] bg-[url('https://static.vecteezy.com/system/resources/previews/001/882/531/non_2x/dark-blue-technology-background-free-vector.jpg')]">
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col items-center justify-center gap-4 p-8 bg-blue-100 rounded-lg shadow-lg w-[90%] sm:w-[28rem]">

                    <h1 className="text-4xl font-bold text-orange-600 mb-4">
                        Contact Us
                    </h1>

                    <div className="flex flex-col w-full gap-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Name
                        </label>
                        <input
                            className="px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-black"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            className="px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-black"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Message
                        </label>
                        <textarea
                            className="px-4 py-2 border border-gray-300 rounded-lg h-40 bg-transparent text-black"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-lg font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                        Submit
                    </button>

                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;