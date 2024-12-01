CREATE OR REPLACE PROCEDURE list_managers_and_services()
LANGUAGE plpgsql
AS $$
DECLARE
    rec RECORD;
BEGIN
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_managers AS
    SELECT
        e.first_name AS manager_name,
        s.name AS service_name
    FROM
        employees e
    JOIN
        manage m ON e.id = m.employee_id
    JOIN
        services s ON m.service_id = s.id;

    RAISE NOTICE 'Managers and their Services:';

    FOR rec IN SELECT * FROM temp_managers LOOP
        RAISE NOTICE '% manage %', rec.manager_name, rec.service_name;
    END LOOP;
END;
$$
;