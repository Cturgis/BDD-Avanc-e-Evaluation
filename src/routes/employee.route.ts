import { Router, Request, Response } from 'express';
import db from '../config/db';

const router = Router();

interface EmployeeParams {
  id: string;
}

router.get('/:id', async (req: Request<EmployeeParams>, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM employees WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

export default router;