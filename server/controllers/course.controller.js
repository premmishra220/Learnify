import "dotenv/config";
import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select("-lectures");

        
        res.status(200).json({
            success: true,
            message: "All courses ",
            data: courses,   
            courses,         
        });

    } catch (error) {
        return next(new AppError("Unable to find Courses ! please try again", 500));
    }
};

const getAllLecturesByCourseId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return next(new AppError("Invalid Course id ! ", 400));
        }

        return res.status(200).json({
            success: true,
            message: "Course lectures fetched successfully ",
            lectures: course.lectures,
        });
    } catch (error) {
        return next(new AppError(`Unable to fetch lectures !`, 500));
    }
};

const createCourse = async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError("All fields are required !", 400));
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
    });

    if (!course) {
        return next(
            new AppError("Course couldn't be created ! please try Again ", 500)
        );
    }

    if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "lms",
        });

        if (result) {
            course.thumbnail.public_id = result.public_id;
            course.thumbnail.secure_url = result.secure_url;
        }

        await fs.rm(`uploads/${req.file.filename}`);
    }

    await course.save();

    return res.status(200).json({
        success: true,
        message: "Course created successfully",
        data: course,   
        course,
    });
};

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!course) {
            return next(new AppError("Course doesn't exist !", 400));
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,  
            course,
        });

    } catch (error) {
        return next(
            new AppError("Unable to update this course ! please try Again", 500)
        );
    }
};

const removeCourse = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Course.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        return next(new AppError("Unable to delete this course ! please try Again", 500));
    }
};

const addLecturesToCourseById = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        if (!title || !description) {
            return next(new AppError("All fields are required!", 400));
        }

        const course = await Course.findById(id);

        if (!course) {
            return next(new AppError("Course doesn't exist!", 404));
        }

        const lectureData = {
            title,
            description,
            lecture: {}
        };

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lms",
                resource_type: "video"
            });

            lectureData.lecture.public_id = result.public_id;
            lectureData.lecture.secure_url = result.secure_url;

            await fs.unlink(req.file.path);
        }

        course.lectures.push(lectureData);
        course.noOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture added successfully."
        });

    } catch (error) {
        next(error);
    }
};

const removeLectureFromCourseById = async (req, res, next) => {
    try {
        const { courseId, lectureId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        course.lectures = course.lectures.filter(
            (lecture) => lecture._id.toString() !== lectureId
        );

        course.noOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture removed successfully"
        });

    } catch (error) {
        next(error);
    }
};

export {
    getAllCourses,
    getAllLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLecturesToCourseById,
    removeLectureFromCourseById
};