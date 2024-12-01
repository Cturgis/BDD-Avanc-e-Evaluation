1. Création du projet nodeJS
   ```bash
   npm init -y
   npm install typescript ts-node @types/node @types/express express
   npx tsc --init
   mkdir src
   touch src/app.ts
   mkdir src/routes
   mkdir src/models
   mkdir src/scripts
   mkdir src/views
   ```

2. Use scripts :
   ```bash 
    npx ts-node src/scripts/scriptName
   ```
   
3. Run app :
   ```bash 
   npx tsc
   node dist/app.js
   ```

4. Dependences
   ```shell
      npm install --save-dev nodemon @types/nodemon #live reloading
      npm install pg @types/pg #client postgres
      npm install dotenv
      npm install jest supertest @types/jest ts-jest --save-dev
   ```
   
5. start app :
   ```shell
   npm start
   ```
   
6. Route :
  - /api/services
    - /add
    - /delete/:id
    - /update/:id
    - /get-manager/:id
  - /api/employees
    - /get/:id
    - /add
    - /delete/:id
    - /update/:id
   