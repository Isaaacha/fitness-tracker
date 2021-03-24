const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// morgon logs each action we take on server
app.use(logger("dev"));

// allow access to public folder when it runs on server(localhost)
app.use(express.static("public"));

// htmlroutes
app.use(require("./routes/htmlRoutes"));

// api routes
app.use(require("./routes/apiRoutes.js"));

// connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

// server start listening on specific port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
