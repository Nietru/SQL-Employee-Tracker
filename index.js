const mysql = require("mysql2");
require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Poopdick09",
    database: "business_db",
  },
  console.log("Database Connected!")
);

connection.connect(function (err) {
  if (err) throw err;
  startApp();
});

function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        name: "startApp",
      },
    ])
    .then((res) => {
      switch (res.startApp) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          return process.exit();
      }
    });
}

function viewEmployees() {
  const sqlString = `
  SELECT first_name, last_name, title, salary, name AS department
  FROM employee
  JOIN role
  ON role_id = role.id
  JOIN department
  ON department_id = department.id`;

  connection.query(sqlString, (err, data) => {
    if (err) throw err;

    console.log("\n");
    console.table(data);
    console.log("\n");

    startApp();
  });
}
// COULD NOT FIGURE OUT :

// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         message: "What is the first name of your new employee?",
//         name: "firstName",
//         type: "input",
//       },
//       {
//         message: "What is the last name of your new employee?",
//         name: "lastName",
//         type: "input",
//       },
//       {
//         message: "Select the role of your new employee:",
//         name: "role",
//         type: "list",
//         choices: role.title,
//       },
//       {
//         message: "Select your new employee's manager:",
//         name: "manager",
//         type: "list",
//         choices: manager.title,
//       },
//     ])
//     .then((answers) => {
//       console.log(answers);
//       const sqlString = `
//       INSERT INTO employee (first_name, last_name, role_id, manager_id)
//       VALUES (?, ? , ?, ?)`;

//       connection.query(
//         sqlString,
//         [answers.firstName, answers.lastName, answers.role, answers.manager],
//         (err, data) => {
//           if (err) throw err;

//           console.log("You added a new employee!");
//           startApp();
//         }
//       );
//     });
// }

function viewDepartments() {
  const sqlString = `
  SELECT id, name
  FROM department`;

  connection.query(sqlString, (err, data) => {
    if (err) throw err;

    console.log("\n");
    console.table(data);
    console.log("\n");

    startApp();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        message: "What is the name of your new department",
        name: "newDept",
        type: "input",
      },
    ])
    .then((answer) => {
      const sqlString = `
    INSERT INTO department (name)
    VALUES (?)`;

      connection.query(sqlString, [answer.newDept], (err, data) => {
        if (err) throw err;
        console.log("\n You added a department!");
        startApp();
      });
    });
}

function addRole() {
  // because role has a foreign key we need to 'load' the information of the foreign table to get the IDs that match the departments
  // otherwise we're just guessing

  //this is one way, though not the most optimal
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;

    console.log(data);
    //inquirer has a setting for a list of choices that allows to illustrate a choice, but the value is different, for example I choose Bob, but the value is bob's id

    const newOrganizedData = data.map((item) => ({
      name: item.name,
      value: item.id,
    }));

    console.log(newOrganizedData);

    inquirer
      .prompt([
        {
          message: "What is the new role?",
          name: "newTitle",
        },
        {
          message: "What is the Salary",
          name: "newSalary",
        },
        {
          message: "Which department does this role belong to?",
          name: "newDeptId",
          type: "list",
          choices: newOrganizedData,
        },
      ])
      .then((answers) => {
        console.log(answers);
        const sqlString = `
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ? , ?)`;

        connection.query(
          sqlString,
          [answers.newTitle, answers.newSalary, answers.newDeptId],
          (err, data) => {
            if (err) throw err;

            console.log("added new role");
            startApp();
          }
        );
      });
  });
}
