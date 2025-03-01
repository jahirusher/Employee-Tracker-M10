"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
exports.db = {
    query: (text, params) => pool.query(text, params),
    getDepartments: () => exports.db.query("SELECT * FROM department"),
    getRoles: () => exports.db.query(`SELECT role.id, role.title, role.salary, department.name AS department
       FROM role 
       JOIN department ON role.department_id = department.id`),
    getEmployees: () => exports.db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
              m.first_name AS manager_first, m.last_name AS manager_last
       FROM employee e
       JOIN role r ON e.role_id = r.id
       JOIN department d ON r.department_id = d.id
       LEFT JOIN employee m ON e.manager_id = m.id`),
    addDepartment: (name) => exports.db.query("INSERT INTO department (name) VALUES ($1)", [name]),
    addRole: (title, salary, department_id) => exports.db.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]),
    addEmployee: (first_name, last_name, role_id, manager_id) => exports.db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [first_name, last_name, role_id, manager_id]),
    updateEmployeeRole: (employee_id, role_id) => exports.db.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role_id, employee_id]),
};
