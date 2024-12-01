CREATE OR REPLACE PROCEDURE get_top_5_services_by_payroll()
LANGUAGE plpgsql
AS $$
DECLARE
    rec RECORD;
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

    RAISE NOTICE 'Top 5 Services by Payroll:';

    FOR rec IN SELECT * FROM temp_top_services LOOP
        RAISE NOTICE 'Service: %, Total Payroll: %', rec.service_name, rec.total_payroll;
    END LOOP;
END;
$$
;