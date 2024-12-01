CREATE OR REPLACE PROCEDURE list_managers_and_services()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_managers AS
    SELECT
        e.first_name || ' ' || e.last_name AS manager_name,
        s.name AS service_name
    FROM
        employees e
    JOIN
        manage m ON e.id = m.employee_id
    JOIN
        services s ON m.service_id = s.id
    WHERE
        e.id IN (SELECT employee_id FROM manage);
END;
$$
;