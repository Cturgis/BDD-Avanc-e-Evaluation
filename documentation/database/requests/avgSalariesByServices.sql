SELECT
    s.name AS service_name,
    AVG(e.salary)::numeric(10, 2) AS average_salary
FROM
    services s
LEFT JOIN
    employees e ON s.id = e.service_id
GROUP BY
    s.id, s.name
ORDER BY
    average_salary ASC;
