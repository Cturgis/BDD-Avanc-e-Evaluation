INSERT INTO services (name, office_number)
SELECT 
  'Service ' || generate_series,
  floor(random() * 1000 + 1)::int
FROM generate_series(1, 100);

INSERT INTO employees (first_name, last_name, email, salary, service_id)
SELECT 
  'Agent' || generate_series,
  'LastName',
  'employee' || generate_series || '@example.com',
  (random() * (5000 - 1747.20) + 1747.20)::numeric(10,2),
  floor(random() * 100 + 1)::int
FROM generate_series(1, 1000);

INSERT INTO manage (service_id, employee_id, start_date)
SELECT 
    s.id AS service_id,
    e.id AS employee_id,
    CURRENT_DATE - (random() * 365 * 5)::int AS start_date
FROM 
    services s
JOIN 
    employees e ON e.service_id = s.id
WHERE 
    e.id IN (
        SELECT id FROM employees WHERE service_id = s.id ORDER BY random() LIMIT 1
    )
GROUP BY 
    s.id, e.id;

INSERT INTO manage (service_id, employee_id, start_date)
SELECT DISTINCT ON (s.id) 
    s.id AS service_id,
    e.id AS employee_id,
    CURRENT_DATE - (random() * 365 * 5)::int AS start_date
FROM 
    services s
JOIN 
    employees e ON e.service_id = s.id
ORDER BY 
    s.id, random()
ON CONFLICT (service_id, employee_id) DO NOTHING;