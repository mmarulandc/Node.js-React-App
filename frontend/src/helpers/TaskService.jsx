import AuthService from "./AuthService";
export default class TaskService {
  // Initializing important variables
  constructor() {
    this.Auth = new AuthService();
    this.addTask = this.addTask.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.getUserTasks = this.getUserTasks.bind(this);
    this.getTaskById = this.getTaskById.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  addTask(body) {
    let id = this.getUserId();
    return this.Auth.fetch(`/api/task/add`, {
      method: "POST",
      body: JSON.stringify({
        creator: id,
        taskName: body.taskName,
        description: body.description,
        priority: body.priority,
        expectedDate: body.expectedDate,
      }),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getUserTasks() {
    let id = this.getUserId();
    return this.Auth.fetch(`/api/task/getAll`, {
      method: "POST",
      body: JSON.stringify({
        creatorID: id,
      }),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  deleteTask(id) {
    return this.Auth.fetch("/api/task/delete", {
      method: "DELETE",
      body: JSON.stringify({
        taskID: id,
      }),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getTaskById(id) {
    return this.Auth.fetch("/api/task/getTaskInfo", {
      method: "POST",
      body: JSON.stringify({
        taskID: id,
      }),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  editTask(body) {
    return this.Auth.fetch("/api/task/editTask", {
      method: "PUT",
      body: JSON.stringify({
        taskID: body.taskID,
        taskName: body.taskName,
        description: body.description,
        priority: body.priority,
        expectedDate: body.expectedDate,
      }),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  checkTaskDate() {
    return this.Auth.fetch("/api/task/checkTaskDates", {
      method: "POST",
      body: JSON.stringify({
        creatorID: this.getUserId(),
      }),
    }).then((res) => {
      return Promise.resolve(res);
    });
  }

  getUserId() {
    return this.Auth.getProfile(this.Auth.getToken).id;
  }
}
