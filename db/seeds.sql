INSERT INTO department (name) 
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Cena", 1, NULL),
       ("Megan", "Doe", 2, NULL),
       ("George", "Howitt", 3, 1),
       ("Charlie", "Day", 4, 1),
       ("Gina", "Cody", 5, 1),
       ("Tifannie", "Truman", 6, 2),
       ("Patrick", "Bateman", 7, 2),
       ("Sister", "Mary-Catherine", 8, 2);