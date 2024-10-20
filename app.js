const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");
const Job = require("./models/Job");
const Sequelize = require("sequelize");
const { error } = require("console");
const Op = Sequelize.Op;
const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O express está rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//handle bars
app.set("views", path.join(__dirname, "views")); //indica onde fica o diretório das views
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//diretorio static
app.use(express.static(path.join(__dirname, "public")));

//db connection
db.authenticate()
  .then(() => {
    console.log("Conectou ao banco de dados.");
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco de dados.");
  });

//routes
app.get("/", (req, res) => {
  let search = req.query.job;
  let query = "%" + search + "%"; //word => wordpress, ph => php, press => wordpress
  if (!search) {
    Job.findAll({
      order: [["createdAt", "DESC"]],
    })
      .then((jobs) => {
        res.render("index", { jobs });
      })
      .catch((error) => console.log(error));
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [["createdAt", "DESC"]],
    })
      .then((jobs) => {
        res.render("index", { jobs });
      })
      .catch((error) => console.log(error));
  }
});

//job routes
app.use("/jobs", require("./routes/jobs"));
