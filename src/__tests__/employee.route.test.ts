import request from 'supertest';
import app from '../app';
import db from '../config/db';

let server: any;
const port = 3000;

describe('Add employee', () => {
  beforeAll(() => {
    server = app.listen(port);
  });

  afterAll(() => {
    server.close();
  });

  it('should add an employee', async () => {
    const newEmployee = {
      first_name: 'Coco',
      last_name: 'Turgis',
      email: 'coco.turgis@yopmail.com',
      salary: 2500.00,
      service_id: 1,
    };

    const response = await request(app)
      .post('/api/employees')
      .send(newEmployee);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.first_name).toBe(newEmployee.first_name);
    expect(response.body.last_name).toBe(newEmployee.last_name);
    expect(response.body.email).toBe(newEmployee.email);
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send({
        first_name: 'John',
        last_name: 'Doe',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required fields');
  });
});

describe('Get employees by id', () => {
  beforeAll(() => {
    server = app.listen(port);
  });

  afterAll(() => {
    server.close();
  });

  it('should return an employee for a valid ID', async () => {
    const response = await request(app).get('/api/employees/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should return 404 if the employee is not found', async () => {
    const response = await request(app).get('/api/employees/9999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Employee not found');
  });

  it('should return 500 if the ID is invalid', async () => {
    const response = await request(app).get('/api/employees/invalid-id');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');
  });
});

describe('Modifier un employee', () => {
  afterAll(async () => {
    await db.query(`DELETE FROM employees WHERE email='flo.thomas@yopmail.com'`);
    server.close();
  });

  let employeeId: number;

  beforeAll(async () => {
    server = app.listen(port);
    const newEmployee = {
      "first_name": "Coco",
      "last_name": "Turgis",
      "email": "Corentin.turgis@yopmail.com",
      "salary": 2500,
      "service_name": "Service1",
      "service_id": 1
    };

    const result = await db.query(
      'INSERT INTO employees (first_name, last_name, email, salary, service_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [newEmployee.first_name, newEmployee.last_name, newEmployee.email, newEmployee.salary, newEmployee.service_id]
    );

    employeeId = result.rows[0].id;
  });

  it('should update an employee', async () => {
    const updatedData = {
      first_name: 'Flo',
      last_name: 'Thomas',
      salary: '2500.00',
    };

    const response = await request(app)
      .put(`/api/employees/${employeeId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.first_name).toBe(updatedData.first_name);
    expect(response.body.last_name).toBe(updatedData.last_name);
    expect(response.body.salary).toBe(updatedData.salary);
  });

  it('should return 404 if employee not found', async () => {
    const response = await request(app)
      .put('/api/employees/9999')
      .send({ first_name: 'Updated' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Employee not found');
  });
});

describe('Employee Routes', () => {
  let employeeId: number;

  beforeAll(async () => {
    const newEmployee = {
      first_name: 'Mark',
      last_name: 'Taylor',
      email: 'mark.taylor@example.com',
      salary: 2800.00,
      service_id: 1,
    };

    const result = await db.query(
      'INSERT INTO employees (first_name, last_name, email, salary, service_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [newEmployee.first_name, newEmployee.last_name, newEmployee.email, newEmployee.salary, newEmployee.service_id]
    );

    employeeId = result.rows[0].id;
  });

  it('should delete an employee', async () => {
    const response = await request(app)
      .delete(`/api/employees/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Employee deleted successfully');
  });

  it('should return 404 if employee not found', async () => {
    const response = await request(app)
      .delete('/api/employees/9999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Employee not found');
  });
});