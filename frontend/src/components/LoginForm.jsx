import React, { Component } from "react";
import { Link } from "react-router-dom";
import Validator from "../helpers/Validator";

import AuthService from "../helpers/AuthService";

export default class LoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.Auth = new AuthService();
    this.Validator = new Validator();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.Validator.validateEmail(
      this.state.username,
    );
    if (errors.email !== "") {
      this.setState({
        errors: errors,
      });
      return;
    }
    this.Auth.login(this.state.username, this.state.password)
      .then((res) => {
        this.props.history.replace("/dashboard");
      })
      .catch((err) => {
        errors.password = err.message
        console.log(err)
        this.setState({
          errors: errors
        });
        return;
      });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container mt-3 ">
          <div className="row">
            <div className="card col-6 center">
              <div className="card-body">
                {/* <img src={logo} alt="logo " className="logo-center"></img> */}
                <form onSubmit={this.handleSubmit} className="mt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.handleChange}
                      name="username"
                      id="name"
                      placeholder="email"
                    />
                    {errors.email ? <p className="text-danger">{errors.email}</p>: null}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.handleChange}
                      name="password"
                      id="pass"
                      placeholder="Password"
                    />
                    {errors.password ? <p className="text-danger">{errors.password}</p>: null}

                  </div>
                  <button type="submit" className="btn btn-primary mb-2">
                    Login
                  </button>
                  <label className="ml-5">
                    <Link to="/signup">Signup</Link>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
