const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost/app_test", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => {
      console.log("Connected to DB test");
      done();
    })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});
