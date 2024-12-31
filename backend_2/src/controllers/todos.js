import sendResponse from "../helpers/sendResponse.js";
import Todos from "../models/Todos.js";

const addTodo =  async (req, res) => {
    let newTodo = new Todos({
      todo: req.body.todo,
      createdBy: req.user._id,
    });
    newTodo = await newTodo.save();
    sendResponse(res, 200, newTodo, false, "Todo added successfully");
  }
  export { addTodo };