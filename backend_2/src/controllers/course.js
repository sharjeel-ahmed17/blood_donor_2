import Course from "../models/Course.js";
import sendResponse from "../helpers/sendResponse.js";


const getCourse =  async (req, res) => {
    const courses = await Course.find();
    sendResponse(res, 200, courses, false, "Courses Fetched successfully");
  }
const addCourse= async (req, res) => {
    let course = new Course(req.body);
    course = await course.save();
    sendResponse(res, 201, course, false, "Courses added successfully");
  }

  export { getCourse, addCourse }