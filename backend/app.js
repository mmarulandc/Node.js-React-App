require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const db = require("./config/database");
const auth = require("./routes/auth");
const app = express();

const port = process.env.PORT || 3000;

//septup middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// app.use(
//   session({
//     secret: process.env.APP_SECRET || "this is the default passphrase",
//     store: new MongoStore({ mongooseConnection: db.connection }),
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session()); // will call the deserializeUser
app.use(passport.initialize())
app.use("/api/auth", auth.router);

app.listen(port, () => {
  console.log(`App listening in port ${port}`);
});

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

module.exports = app;
