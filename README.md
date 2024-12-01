# BDD-Avancé-Evaluation

1. Installation de postgres.

    Choix de postgres pour la Bdd, car plus à l'aise avec.
    ```shell
   brew services start postgresql@16
   createuser -s postgres
   psql -h localhost -U postgres
   ```
2. Execution d'un script
   ```postgresql
   \i scriptPath
   ```
   
3. Liste des scripts :
   - documentation/createDB.sql => Supprime et créer la base de donnée du projet
   - documentation/randomPopulate => Remplis la BDD avec des valeurs aléatoires
   - requests/countEmployee.sql
   - requests/avgSalary.sql
   - requests/avgSalariesByServices.sql

4. Liste des procédures :
   - get_top_5_services_by_payroll()
   - get_employee_count_ranking()
   - list_managers_and_services()

