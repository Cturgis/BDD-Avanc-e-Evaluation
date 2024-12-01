# BDD-Avancé-Evaluation

1. Installation de postgres.
    ```shell
   brew services start postgresql@16
   createuser -s postgres
   psql -h localhost -U postgres
   ```
2. Execution d'un script via postgres cli
   ```postgresql
   \i scriptPath
   ```
   
3. Liste des scripts :
4. - initAll : ```\i Documents/Livecampus/BDD-Avance-Evaluation/documentation/initAll.sql```
   - createDB : ```\i Documents/Livecampus/BDD-Avance-Evaluation/documentation/createDB.sql```
   - randomPopulate : ```\i Documents/Livecampus/BDD-Avance-Evaluation/documentation/randomPopulate.sql```
   - countEmployee : ```\i Documents/Livecampus/BDD-Avance-Evaluation/documentation/requests/countEmployee.sql```
   - avgSalary : ```\i Documents/Livecampus/BDD-Avance-Evaluation/documentation/requests/avgSalary.sql```
   - avgSalariesByServices : ```\i Documents/Livecampus/BDD-Avance-Evaluation/documentation/requests/avgSalariesByServices.sql```

4. Liste des procédures :
   - ```CALL get_top_5_services_by_payroll();```
   - ```CALL get_employee_count_ranking();```
   - ```CALL list_managers_and_services();```

5. Liste des fonctions :
   - ```SELECT salary_difference();```

