import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),

getDepartments: () => db.query("SELECT * FROM department"),
  
  getRoles: () =>
    db.query(
      `SELECT role.id, role.title, role.salary, department.name AS department
       FROM role 
       JOIN department ON role.department_id = department.id`
    ),

  getEmployees: () =>
    db.query(
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
              m.first_name AS manager_first, m.last_name AS manager_last
       FROM employee e
       JOIN role r ON e.role_id = r.id
       JOIN department d ON r.department_id = d.id
       LEFT JOIN employee m ON e.manager_id = m.id`
    ),

  addDepartment: (name: string) => db.query("INSERT INTO department (name) VALUES ($1)", [name]),

  addRole: (title: string, salary: number, department_id: number) =>
    db.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]),

  addEmployee: (first_name: string, last_name: string, role_id: number, manager_id: number | null) =>
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [first_name, last_name, role_id, manager_id]),

  updateEmployeeRole: (employee_id: number, role_id: number) =>
    db.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role_id, employee_id]),
};