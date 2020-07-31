import React from "react";
import Container from "react-bootstrap/Container";
import moment from "moment";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

const TaskArea = (props) => {
  const color = {
    high: "#ff6666",
    medium: "#ffcc99",
    low: " #66ff66",
  };
  return (
    <Container className="mt-5">
      <CardColumns>
        {(props.tasks || []).map((task, index) => {
          return (
            <Card style={{ width: "18rem" }} key={task.id}>
              <button class="btn" onClick={()=>props.handleEditTaskModal(task.id)}>
                <i class="fa fa-bars"></i>
              </button>
              <button class="btn" onClick={()=>props.deleteTask(task.id)}>
                <i class="fa fa-trash"></i>
              </button>
              <Card.Body>
                <Card.Title
                  style={{ backgroundColor: color[`${task.priority}`] }}
                >
                  {task.taskName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {moment(task.expectedDate).format("YYYY-MM-DD")}
                </Card.Subtitle>
                <Card.Text>{task.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  );
};


export default TaskArea;
