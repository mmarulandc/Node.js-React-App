const assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const app = require("../app");
let UserSchema = require("../models/user");
let TaskSchema = require("../models/task");
chai.use(chaiHttp);

const url = "http://localhost:4000";
var jwt = "";
var userID = "";

describe("api test", () => {
  it("Must return email error on response /api/auth/signup", (done) => {
    const testData = {
      username: "test",
      password: "Test246810@",
    };
    chai
      .request(url)
      .post("/api/auth/signup")
      .send(testData)
      .end((error, response) => {
        expect(response.body.info.message).to.equals("Enter a valid email");
        done();
      });
  });
  it("Must return success message on response /api/auth/signup", (done) => {
    const testData = {
      username: "test@test.com",
      password: "Test246810@",
    };
    chai
      .request(url)
      .post("/api/auth/signup")
      .send(testData)
      .end((error, response) => {
        expect(response.body.info.message).to.equals(
          "The user has been registered sucsessfully"
        );
        done();
      });
  });
  it("Must return token on response /api/auth/login", (done) => {
    const testData = {
      username: "test@test.com",
      password: "Test246810@",
    };
    chai
      .request(url)
      .post("/api/auth/login")
      .send(testData)
      .end((error, response) => {
        jwt = response.body.token;
        userID = response.body.user._id;
        expect(response.body).to.have.property("token");
        done();
      });
  });

  it("Must return success on response /api/task/add", (done) => {
    const taskData = {
      creator: userID,
      taskName: "limpiar el patio",
      description: "Tengo que limpiar el patio porque esta bastante sucio",
      priority: "low",
      expectedDate: "2020/07/06",
    };
    chai
      .request(url)
      .post("/api/task/add")
      .set("Authorization", `Bearer ${jwt}`)
      .send(taskData)
      .end((error, response) => {
        expect(response.body.info.message).to.equals("Task added");
        done();
      });
  }).timeout(15000);
});

after((done) => {
  UserSchema.deleteMany({}, (error, response) => {
    done();
  });
  TaskSchema.deleteMany({}, (error, response) => {
    done();
  });
});
