CREATE OR REPLACE FUNCTION salary_difference()
RETURNS numeric AS $$
DECLARE
    max_salary numeric;
    min_salary numeric;
    difference numeric;
BEGIN
    SELECT MAX(salary)::numeric(10, 2) INTO max_salary FROM employees;

    SELECT MIN(salary)::numeric(10, 2) INTO min_salary FROM employees;

    difference := max_salary - min_salary;

    RETURN difference;
END;
$$
 LANGUAGE plpgsql;