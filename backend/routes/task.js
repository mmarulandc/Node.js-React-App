const express = require("express");
const router = express.Router();
const passport = require("../middlewares/jwtStrategy");
const addTask = require("../controllers/addTask");
const getAllTask = require("../controllers/getAllTask");
const deleteTask = require("../controllers/deleteTask");
const getTaskInfo = require("../controllers/getTaskInfo");
const editTask = require("../controllers/editTask");
const checkTaskDates = require("../controllers/checkTasksDate");
const { newTaskChecks, editTaskChecks, validate } = require("../utils/validations");

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  newTaskChecks(),
  validate,
  addTask
);
router.post(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  getAllTask
);
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteTask
);
router.post(
  "/getTaskInfo",
  passport.authenticate("jwt", { session: false }),
  getTaskInfo
);
router.post(
  "/checkTaskDates",
  passport.authenticate("jwt", { session: false }),
  checkTaskDates
);
router.put(
  "/editTask",
  passport.authenticate("jwt", { session: false }),
  editTaskChecks(),
  validate,
  editTask
);

module.exports = router;
