CREATE OR REPLACE PROCEDURE get_top_5_services_by_payroll()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_top_services AS
    SELECT
        s.name AS service_name,
        SUM(e.salary) AS total_payroll
    FROM
        services s
    JOIN
        employees e ON s.id = e.service_id
    GROUP BY
        s.id, s.name
    ORDER BY
        total_payroll DESC
    LIMIT 5;
END;
$$
;