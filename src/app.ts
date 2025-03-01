import inquirer from "inquirer";
import { db } from "./db";

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "View all departments":
      const departments = await db.getDepartments();
      console.table(departments.rows);
      break;
      
    case "View all roles":
      const roles = await db.getRoles();
      console.table(roles.rows);
      break;
      
    case "View all employees":
      const employees = await db.getEmployees();
      console.table(employees.rows);
      break;

    case "Add a department":
      const { deptName } = await inquirer.prompt([
        { type: "input", name: "deptName", message: "Enter department name:" },
      ]);
      await db.addDepartment(deptName);
      console.log("Department added!");
      break;

    case "Add a role":
      const { title, salary, department_id } = await inquirer.prompt([
        { type: "input", name: "title", message: "Enter role title:" },
        { type: "number", name: "salary", message: "Enter salary:" },
        { type: "number", name: "department_id", message: "Enter department ID:" },
      ]);
      await db.addRole(title, salary, department_id);
      console.log("Role added!");
      break;

    case "Add an employee":
      const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: "input", name: "first_name", message: "Enter first name:" },
        { type: "input", name: "last_name", message: "Enter last name:" },
        { type: "number", name: "role_id", message: "Enter role ID:" },
        { type: "number", name: "manager_id", message: "Enter manager ID (or leave blank):", default: null },
      ]);
      await db.addEmployee(first_name, last_name, role_id, manager_id);
      console.log("Employee added!");
      break;

    case "Update an employee role":
      const { employee_id, new_role_id } = await inquirer.prompt([
        { type: "number", name: "employee_id", message: "Enter employee ID:" },
        { type: "number", name: "new_role_id", message: "Enter new role ID:" },
      ]);
      await db.updateEmployeeRole(employee_id, new_role_id);
      console.log("Employee role updated!");
      break;

    case "Exit":
      process.exit();
  }
  
  mainMenu();
};

mainMenu();
