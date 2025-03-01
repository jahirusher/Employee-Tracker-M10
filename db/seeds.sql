INSERT INTO department (name) VALUES 
('Engineering'), 
('HR'), 
('Finance'),
('Legal'),
('Marketing'),
('Sales'),
('Customer Service'),
('Research');


INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 70000, 1), 
('HR Manager', 60000, 2), 
('Accountant', 50000, 3),
('Lawyer', 80000, 4),
('Salesperson', 40000, 5),
('Customer Service Rep', 30000, 7),
('Researcher', 60000, 8),
('Intern', 20000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Johnson', 1, NULL), 
('Bob', 'Smith', 2, 1), 
('Charlie', 'Brown', 3, NULL),
('David', 'Wilson', 4, 3),
('Eve', 'Williams', 5, 3),
('Frank', 'Miller', 6, 2),
('Grace', 'Davis', 7, 3),
('Hannah', 'Martinez', 8, 7);
