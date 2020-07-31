import React from "react";

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      trend: "",
    };
  }

  handleChange = (event) => {
    this.setState({ trend: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.search(this.state.trend);
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <a className="navbar-brand" href="/trendi">
          Task App
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav"></div>
        </div>
        <button
          className="btn my-2 my-sm-0 mr-5 bg-warning btn-lg"
          onClick={this.props.openNewTaskModal}
        >
         Add task
        </button>
        <button
          className="btn btn-outline-light my-2 my-sm-0 btn-lg"
          onClick={this.props.handleLogout}
        >
          Log Out
        </button>
      </nav>
    );
  }
}

export default Header;
