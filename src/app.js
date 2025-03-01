"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const db_1 = require("./db");
const mainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = yield inquirer_1.default.prompt([
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
            const departments = yield db_1.db.getDepartments();
            console.table(departments.rows);
            break;
        case "View all roles":
            const roles = yield db_1.db.getRoles();
            console.table(roles.rows);
            break;
        case "View all employees":
            const employees = yield db_1.db.getEmployees();
            console.table(employees.rows);
            break;
        case "Add a department":
            const { deptName } = yield inquirer_1.default.prompt([
                { type: "input", name: "deptName", message: "Enter department name:" },
            ]);
            yield db_1.db.addDepartment(deptName);
            console.log("Department added!");
            break;
        case "Add a role":
            const { title, salary, department_id } = yield inquirer_1.default.prompt([
                { type: "input", name: "title", message: "Enter role title:" },
                { type: "number", name: "salary", message: "Enter salary:" },
                { type: "number", name: "department_id", message: "Enter department ID:" },
            ]);
            yield db_1.db.addRole(title, salary, department_id);
            console.log("Role added!");
            break;
        case "Add an employee":
            const { first_name, last_name, role_id, manager_id } = yield inquirer_1.default.prompt([
                { type: "input", name: "first_name", message: "Enter first name:" },
                { type: "input", name: "last_name", message: "Enter last name:" },
                { type: "number", name: "role_id", message: "Enter role ID:" },
                { type: "number", name: "manager_id", message: "Enter manager ID (or leave blank):", default: null },
            ]);
            yield db_1.db.addEmployee(first_name, last_name, role_id, manager_id);
            console.log("Employee added!");
            break;
        case "Update an employee role":
            const { employee_id, new_role_id } = yield inquirer_1.default.prompt([
                { type: "number", name: "employee_id", message: "Enter employee ID:" },
                { type: "number", name: "new_role_id", message: "Enter new role ID:" },
            ]);
            yield db_1.db.updateEmployeeRole(employee_id, new_role_id);
            console.log("Employee role updated!");
            break;
        case "Exit":
            process.exit();
    }
    mainMenu();
});
mainMenu();
