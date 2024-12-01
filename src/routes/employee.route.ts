import { Router, Request, Response } from 'express';
import db from '../config/db';
import { Employee } from '../models/Employee';

const router = Router();

interface EmployeeParams {
  id: string;
}

router.post(
  '/add',
  async (req: Request, res: Response): Promise<any> => {
    const { first_name, last_name, email, salary, service_id }: Employee = req.body;

    if (!first_name || !last_name || !email || !salary || !service_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const query = `
          INSERT INTO employees (first_name, last_name, email, salary, service_id)
          VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
      const result = await db.query(query, [first_name, last_name, email, salary, service_id]);

      res.status(201).json(result.rows[0]);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

router.put(
  '/modify/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { first_name, last_name, email, salary, service_id }: Employee = req.body;

    if (!first_name && !last_name && !email && !salary && !service_id) {
      return res.status(400).json({ error: 'No data provided to update' });
    }

    try {
      const fieldsToUpdate = [];
      const valuesToUpdate: any[] = [];
      let setQuery = '';

      if (first_name) {
        fieldsToUpdate.push('first_name');
        valuesToUpdate.push(first_name);
      }
      if (last_name) {
        fieldsToUpdate.push('last_name');
        valuesToUpdate.push(last_name);
      }
      if (email) {
        fieldsToUpdate.push('email');
        valuesToUpdate.push(email);
      }
      if (salary) {
        fieldsToUpdate.push('salary');
        valuesToUpdate.push(salary);
      }
      if (service_id) {
        fieldsToUpdate.push('service_id');
        valuesToUpdate.push(service_id);
      }

      setQuery = fieldsToUpdate.map((field, index) => `${field} = $${index + 1}`).join(', ');

      const query = `
        UPDATE employees
        SET ${setQuery}
        WHERE id = $${valuesToUpdate.length + 1}
        RETURNING *;
      `;
      const result = await db.query(query, [...valuesToUpdate, id]);

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }

      res.json(result.rows[0]);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.delete(
  '/delete/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      const query = `
        DELETE FROM employees
        WHERE id = $1
        RETURNING *;
      `;
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.get(
  '/get/:id',
  async (req: Request<EmployeeParams>, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM employees WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

export default router;