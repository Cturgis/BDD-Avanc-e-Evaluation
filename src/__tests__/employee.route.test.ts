import request from 'supertest';
import app from '../app';

let server: any;
const port = 3001;

beforeAll(() => {
  server = app.listen(port);
});

afterAll(() => {
  server.close();
});

describe('Employee Routes', () => {
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