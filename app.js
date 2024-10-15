const express = require("express");
const app = express();
const db = require("./db/connection");

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O express está rodando na porta ${PORT}`);
});

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
  res.send("Está funcionando 2.");
});
