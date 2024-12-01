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

describe('Manager Routes', () => {
  it('should return a manager for a valid service', async () => {
    const response = await request(app).get('/api/services/managers/8');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('first_name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('service_id');
    expect(response.body.service_id).toBe(8)
  });

  it('should return 404 for an invalid service', async () => {
    const response = await request(app).get('/api/services/manager/InvalidService');
    expect(response.status).toBe(404);
  });
});