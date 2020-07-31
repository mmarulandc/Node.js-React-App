const TaskScheme = require("../models/task");

module.exports = async (req, res) => {
  try {
    let perPage = req.body.perPage || 3;
    let currentPage = req.body.currentPage || 1;
    let creatorID = req.body.creatorID
    let foundTask = await TaskScheme
      .find({creator: creatorID})
      .populate("creator")
      .select("creator taskName description priority expectedDate")
      // .skip(perPage * currentPage - perPage)
      // .limit(perPage);
    if (foundTask.length === 0) {
      return res.status(200).json({
        message: "There are not available tasks",
      });
    }
    let numTask = await TaskScheme.find({creator: creatorID}).countDocuments();
    
    return res.status(200).json({
      message: "Ok",
      // currentPage: currentPage,
      // perPage: perPage,
      // pages: Math.ceil(numTask / perPage),
      task: foundTask.map((task) => {
        return {
          id: task._id,
          username: task.creator.username,
          taskName: task.taskName,
          description: task.description,
          priority: task.priority,
          expectedDate: task.expectedDate,
        };
      }),
      numResult: numTask,
    });
  } catch (err) {
    console.log(err);
    return res.status.json(500).json({
      message:
        "unable to fetch, try later",
    });
  }
};
