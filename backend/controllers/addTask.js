const TaskSchema = require("../models/task");
const UserSchema = require("../models/user");
var ObjectID = require("mongodb").ObjectID;

const addTask = async (req, res) => {
  try {
    let { taskName, priority, description, expectedDate, creator } = req.body;
    let task = new TaskSchema({
      creator: creator,
      taskName: taskName,
      priority: priority,
      description: description,
      expectedDate:  expectedDate
    });
    await task.save();
    return res.status(200).json({
      info:{
        message:"Task added"
      }
    })
  } catch (error) {
    res.status(500).json({
      message:
        "An error has ocurried, try later",
    });
    console.log(`An error has ocurried ${error}`);
  }
};


module.exports = addTask;