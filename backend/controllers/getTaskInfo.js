const TaskScheme = require("../models/task");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = async (req, res) => {
  try {
    let taskID = req.body.taskID;
    if (!ObjectId.isValid(taskID)) {
      return res.status(400).json({
        message: "Bad request, not valid TaskID",
      });
    }
    let foundTask = await TaskScheme
      .findById(taskID)
      .select("taskName priority expectedDate description _id")
    if(foundTask === null){
      return res.status(404).json({
        info:{
          message: "Task not found"
        }
      })
    }
    return res.status(200).json({
      message: "Ok",
      taskID: foundTask._id,
      creator: foundTask.username,
      taskName: foundTask.taskName,
      priority: foundTask.priority,
      description: foundTask.description,
      expectedDate: foundTask.expectedDate,
    });
  } catch (err) {
    console.log(err);
    return res.status.json(500).json({
      message:
        "unable to fetch, try later",
    });
  }
};
