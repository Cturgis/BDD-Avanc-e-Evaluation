// src/app.ts

import express from 'express';
import employeeRoutes from './routes/employee.route';
import serviceRoutes from './routes/service.route';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the employee routes
app.use('/api/employees', employeeRoutes);
app.use('/api/services', serviceRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});