-- Populate services table
INSERT INTO services (name, office_number)
SELECT 
  'Service ' || generate_series,
  floor(random() * 1000 + 1)::int
FROM generate_series(1, 100);

INSERT INTO employees (first_name, last_name, email, salary, service_id)
SELECT 
  'FirstName' || generate_series,
  'LastName' || generate_series,
  'employee' || generate_series || '@example.com',
  (random() * (5000 - 1747.20) + 1747.20)::numeric(10,2),
  floor(random() * 100 + 1)::int
FROM generate_series(1, 1000);

INSERT INTO manage (service_id, employee_id, start_date)
SELECT 
  services.id,
  employees.id,
  current_date - (random() * 365 * 5)::int
FROM services
JOIN employees ON employees.service_id = services.id
WHERE random() < 0.1
LIMIT 50;