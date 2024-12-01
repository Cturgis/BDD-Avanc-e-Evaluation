import express, { Express } from 'express';
import employeeRoutes from './routes/employee.route';
import serviceRoutes from './routes/service.route';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/services', serviceRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;