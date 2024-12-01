CREATE DATABASE company;
\c company;

DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS manage;

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    office_number INT NOT NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    service_id INT,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE manage (
    service_id INT,
    employee_id INT,
    start_date DATE NOT NULL,
    PRIMARY KEY (service_id, employee_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE ON UPDATE CASCADE
);