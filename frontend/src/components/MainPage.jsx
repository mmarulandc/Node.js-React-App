import React, { Component } from "react";
import Header from "./Header";
import AuthService from "../helpers/AuthService";
import TaskService from "../helpers/TaskService";
import WithAuth from "../helpers/WithAuth";
import TaskArea from "./TaskArea";
import NewTaskForm from "./NewTaskForm";
import EditTaskForm from "./EditTaskForm";
import Row from "react-bootstrap/Row";
import ExpiredModal from "./ExpiredModal";

const Auth = new AuthService();
class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isNewTaskModalOpen: false,
      isEditTaskModalOpen: false,
      isSaving: false,
      needUpdate: false,
      editedTask: {},
      tasks: [],
      aboutToExpire: [],
      isExpiredModalOpen: false,
    };
    this.taskService = new TaskService();
    this.openNewTaskModal = this.openNewTaskModal.bind(this);
    this.closeNewTaskModal = this.closeNewTaskModal.bind(this);
    this.closeEditTaskModal = this.closeEditTaskModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateOn = this.updateOn.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleEditTaskModal = this.handleEditTaskModal.bind(this);
    this.closeExpiredModal = this.closeExpiredModal.bind(this);
  }

  componentDidMount() {
    this.taskService.checkTaskDate().then((data) => {
      if ((data.dates || []).length > 0) {
        this.setState({
          isExpiredModalOpen: true,
          aboutToExpire: data.dates,
        });
      }
    });
    this.setState(
      {
        loading: true,
      },
      async () => {
        const res = await this.taskService.getUserTasks();
        this.setState({
          loading: false,
          tasks: res.task || [],
        });
      }
    );
  }
  openNewTaskModal() {
    this.setState({
      isNewTaskModalOpen: true,
    });
  }

  closeNewTaskModal() {
    this.setState({
      isNewTaskModalOpen: false,
    });
  }
  closeEditTaskModal() {
    this.setState({
      isEditTaskModalOpen: false,
    });
  }
  openEditTaskModal() {
    this.setState({
      isEditTaskModalOpen: true,
    });
  }

  closeExpiredModal() {
    this.setState({
      isExpiredModalOpen: false,
    });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/");
  };

  async updateOn() {
    const res = await this.taskService.getUserTasks();
    this.setState({
      tasks: res.task || [],
    });
  }

  deleteTask(id) {
    if (window.confirm("Are you sure you want to delete it?")) {
      this.taskService
        .deleteTask(id)
        .then((data) => {
          this.updateOn();
        })
        .then((error) => {
          console.log(error);
          return;
        });
    }
  }

  async handleEditTaskModal(id) {
    let data = await this.taskService.getTaskById(id);
    this.setState({
      editedTask: data,
    });
    this.openEditTaskModal();
  }

  LoadingTask = () => {
    if (this.state.tasks.length === 0)
      return (
        <Row className="justify-content-md-center mt-5">
          <p>There is not records</p>
        </Row>
      );
    else
      return (
        <TaskArea
          tasks={this.state.tasks}
          LoadingSpinner={this.LoadingSpinner}
          deleteTask={this.deleteTask}
          handleEditTaskModal={this.handleEditTaskModal}
        ></TaskArea>
      );
  };

  render() {
    let {
      isNewTaskModalOpen,
      isEditTaskModalOpen,
      editedTask,
      isExpiredModalOpen,
      aboutToExpire,
    } = this.state;
    return (
      <div>
        <Header
          openNewTaskModal={this.openNewTaskModal}
          handleLogout={this.handleLogout}
        ></Header>
        <NewTaskForm
          closeNewTaskModal={this.closeNewTaskModal}
          isNewTaskModalOpen={isNewTaskModalOpen}
          updateOn={this.updateOn}
        ></NewTaskForm>
        {this.LoadingTask()}
        <EditTaskForm
          closeEditTaskModal={this.closeEditTaskModal}
          isEditTaskModalOpen={isEditTaskModalOpen}
          editedTask={editedTask}
          updateOn={this.updateOn}
        />
        <ExpiredModal
          isExpiredModalOpen={isExpiredModalOpen}
          closeExpiredModal={this.closeExpiredModal}
          aboutToExpire={aboutToExpire}
        />
      </div>
    );
  }
}

export default WithAuth(MainPage);
