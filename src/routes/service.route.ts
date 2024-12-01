import { Router, Request, Response } from 'express';
import { ManagerParams } from '../models/Employee';
import db from '../config/db';

const router = Router();

router.get(
  '/managers/:id',
  async (req: Request<ManagerParams>, res: Response): Promise<void> => {
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
      res.status(404).json({ error: 'No manager found for the specified service' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;