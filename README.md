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
   \i Documents/Livecampus/BDD-Avance-Evaluation/documentation/createDB.sql
   ```
   
