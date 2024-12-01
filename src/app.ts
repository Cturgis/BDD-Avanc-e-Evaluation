// src/app.ts

import express from 'express';
import employeeRoutes from './routes/employee.route';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the employee routes
app.use('/api/employees', employeeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});