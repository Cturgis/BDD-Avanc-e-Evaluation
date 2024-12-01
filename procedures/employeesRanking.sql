CREATE OR REPLACE PROCEDURE get_employee_count_ranking()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_ranking AS
    SELECT
        ROW_NUMBER() OVER (ORDER BY COUNT(e.id) DESC) AS rank,
        s.name AS service_name,
        COUNT(e.id) AS employee_count
    FROM
        services s
    LEFT JOIN
        employees e ON s.id = e.service_id
    GROUP BY
        s.id, s.name
    ORDER BY
        employee_count DESC;
END;
$$
;