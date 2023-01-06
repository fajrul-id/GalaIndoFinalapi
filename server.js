const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const postRoute = require("./app/routes/post.route");

const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/post", postRoute);

app.listen(port, () =>
  console.log(`App listening on port http://localhost:${port}!`)
);
