const TaskScheme = require("../models/task");
const moment = require("moment");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = async (req, res) => {
  try {
    let creatorID = req.body.creatorID;
    if (!ObjectId.isValid(creatorID)) {
      return res.status(400).json({
        message: "Bad request, not valid creatorID",
      });
    }
    let taskDates = await TaskScheme.find({ creator: creatorID }).select(
      "expectedDate taskName"
    );

    if (taskDates.length === 0) {
      return res.status(200).json({
        message: "There are not available tasks",
      });
    }
    let almost = taskDates.filter(
      (task) =>
        moment(task.expectedDate).diff(moment().format("YYYY-MM-DD"), "days") <=
        2
    );
    return res.status(200).json({
      message: "okay",
      dates: almost,
    });
  } catch (err) {
    console.log(err);
    return res.status.json(500).json({
      message: "unable to fetch, try later",
    });
  }
};
