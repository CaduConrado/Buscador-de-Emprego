const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

//test
router.get("/test", (req, res) => {
  res.send("deu certo");
});

//get do formulario
router.get("/add", (req, res) => {
  res.render("add");
});

//get dos detalhes da vaga

router.get("/view/:id", (req, res) => {
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render("view", {
        job,
      });
    })
    .catch((error) => console.log(error));
});

//adiciona job via post
router.post("/add", (req, res) => {
  let { title, description, salary, company, email, new_job } = req.body;

  //insert
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
