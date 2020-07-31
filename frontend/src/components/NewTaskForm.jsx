import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DatePicker from "@trendmicro/react-datepicker";
import "@trendmicro/react-datepicker/dist/react-datepicker.css";

import TaskService from "../helpers/TaskService";
import Validator from "../helpers/Validator";
import moment from "moment";
class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      isNewTaskModalOpen: false,
      taskName: "",
      description: "",
      priority: "Low",
      date: moment().format("YYYY-MM-DD"),
      errors: {},
    };
    this.Validator = new Validator();
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.taskService = new TaskService();
  }

  handleSubmit = async () => {
    const errors = this.Validator.validateAddTaskModal(
      this.state.taskName,
      this.state.date,
      this.state.description
    );
    if (
      errors.taskName !== "" ||
      errors.description !== "" ||
      errors.expectedDate !== ""
    ) {
      this.setState({
        errors: errors,
      });
      return;
    }
    this.taskService
      .addTask({
        taskName: this.state.taskName,
        description: this.state.description,
        priority: this.state.priority,
        expectedDate: this.state.date,
      })
      .then((data) => {
        this.props.closeNewTaskModal();
        this.setState({
          taskName: "",
          description: "",
          priority: "",
          expectedDate: moment().format("YYYY-MM-DD"),
        })
      })
      .then((error) => {
        if (error) return;
      });
    this.props.updateOn();
  };
  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  handleDate = (date) => {
    this.setState({
      date: moment(date).format("YYYY-MM-DD"),
    });
  };

  render() {
    let { isNewTaskModalOpen, closeNewTaskModal } = this.props;
    let { errors } = this.state;

    return (
      <Modal show={isNewTaskModalOpen} onHide={closeNewTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                name="taskName"
                onChange={this.handleChange}
              />
              {errors.taskName ? (
                <p className="text-danger">{errors.taskName}</p>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                name="priority"
                as="select"
                onChange={this.handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows="3"
                onChange={this.handleChange}
              />
              {errors.description ? (
                <p className="text-danger">{errors.description}</p>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Expected date</Form.Label>
            </Form.Group>
            <DatePicker
              defaultDate={this.state.date}
              onSelect={(date) => this.handleDate(date)}
            />
            {errors.expectedDate ? (
              <p className="text-danger">{errors.expectedDate}</p>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeNewTaskModal}>
            Close
          </Button>
          <Button variant="warning" onClick={this.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewTaskForm;
