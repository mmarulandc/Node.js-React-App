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
    let foundUsers = await TaskScheme.findById(taskID);
    if (foundUsers === null || foundUsers === undefined) {
      return res.status(404).json({
        info: {
          message: "Task not found",
        },
      });
    }
    await TaskScheme.findByIdAndDelete(taskID);
    return res.status(200).json({
      info: {
        message: "Task deleted",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status.json(500).json({
      info: {
        message: "unable to fetch, try later",
      },
    });
  }
};
