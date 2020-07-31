import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import Validator from "../helpers/Validator";
import AuthService from "../helpers/AuthService";

export default class SignupForm extends Component {
  constructor() {
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
  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    const { username, password } = this.state;
    event.preventDefault();
    let errors = this.Validator.validateSignupForm(username, password);
    if (errors.email !== "" || errors.password !== "") {
      this.setState({
        errors: errors,
      });
      return;
    }
    this.Auth.signup(username, password)
      .then((res) => {
        alert(res.info.message);
        this.setState({
          username: "",
          password: ""
        });
      })
      .catch((err) => {
        errors.password = err.message;
        this.setState({
          errors: errors
        })
      });
  };

  render() {
    let { errors } = this.state;
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
                      name="username"
                      id="name"
                      placeholder="Email"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    {errors.email ? (
                      <p className="text-danger">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="pass"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    {errors.password ? (
                      <p className="text-danger">{errors.password}</p>
                    ) : null}
                  </div>
                  <button type="submit" className="btn btn-primary mb-2">
                    Signup
                  </button>
                  <label className="ml-5">
                    <Link to="/">Login</Link>
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
