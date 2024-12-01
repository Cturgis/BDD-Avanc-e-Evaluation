import { Router, Request, Response } from 'express';
import { ManagerParams } from '../models/Employee';
import db from '../config/db';
import { AddServiceReq, Service } from '../models/Service';

const router = Router();

router.get(
  '/get-manager/:id',
  async (req: Request<ManagerParams>, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const query = `
      SELECT e.id, e.first_name, e.last_name, e.email, s.id AS service_id, m.start_date
      FROM manage m
      JOIN employees e ON m.employee_id = e.id
      JOIN services s ON m.service_id = s.id
      WHERE s.id = $1
      LIMIT 1;
    `;
    const result = await db.query(query, [Number(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No manager found for the specified service' });
    }

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
  '/add',
  async (req: Request<AddServiceReq>, res: Response): Promise<any> => {
  const { name, office_number } = req.body;

  if (!name || !office_number) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      'INSERT INTO services (name, office_number) VALUES ($1, $2) RETURNING id, name, office_number',
      [name, office_number]
    );

    const newService = result.rows[0];
    res.status(201).json(newService);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/modify/:id', async (req: Request<Partial<Service>>, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, office_number } = req.body;

  if (!name && !office_number) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  try {
    const result = await db.query(
      'UPDATE services SET name = $1, office_number = $2 WHERE id = $3 RETURNING id, name, office_number',
      [name, office_number, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete/:id', async (req: Request<{id: number}>, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM services WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully', id: result.rows[0].id });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;