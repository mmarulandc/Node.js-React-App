const TaskScheme = require("../models/task");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = async (req, res) => {
  try {
    let { taskID, taskName, description, expectedDate, priority } = req.body;
    if (!ObjectId.isValid(taskID)) {
      return res.status(400).json({
        message: "Bad request, not valid TaskID",
      });
    }
    let foundTask = TaskScheme.findById(taskID);
    if (foundTask === null || foundTask === undefined) {
      return res.status(404).json({
        info: {
          message: "Task not found",
        },
      });
    }
    await TaskScheme.findByIdAndUpdate(taskID, {
      taskName: taskName,
      description: description,
      expectedDate: expectedDate,
      priority: priority,
    });
    return res.status(200).json({
      info: {
        message: "Task updated",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status.json(500).json({
      info: {
        message: "unable to update, try later",
      },
    });
  }
};
