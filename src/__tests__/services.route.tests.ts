import request from 'supertest';
import app from '../app';

describe('Service Routes', () => {
  let serviceId: number;

  it('should return a manager for a valid service', async () => {
    const response = await request(app).get('/api/services/get-manager/8');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('first_name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('service_id');
    expect(response.body.service_id).toBe(8);
  });

  it('should return 404 for an invalid service', async () => {
    const response = await request(app).get('/api/services/manager/InvalidService');
    expect(response.status).toBe(404);
  });

  it('should add a service', async () => {
    const newService = {
      name: 'Marketing',
      office_number: 777,
    };

    const response = await request(app)
      .post('/api/services/add')
      .send(newService);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newService.name);
    expect(response.body.office_number).toBe(newService.office_number);

    serviceId = response.body.id;
  });

  it('should update a service', async () => {
    const updatedData = {
      name: 'Sales',
      office_number: 778,
    };

    const response = await request(app)
      .put(`/api/services/update/${serviceId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.office_number).toBe(updatedData.office_number);
  });

  it('should return 404 if service not found', async () => {
    const response = await request(app)
      .put('/api/services/update/9999')
      .send({ name: 'HR' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Service not found');
  });

  it('should delete a service', async () => {
    const response = await request(app)
      .delete(`/api/services/delete/${serviceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Service deleted successfully');
  });

  it('should return 404 if service not found', async () => {
    const response = await request(app)
      .delete('/api/services/delete/9999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Service not found');
  });
});