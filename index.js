const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my database name goes here",
});

connection.connect(function (err) {
  if (err) throw err;
  startApp();
});

function startApp() {
  //inquirer goes here!!!
}
