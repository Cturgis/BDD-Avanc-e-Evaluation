import { Router } from 'express';
import db from '../config/db';

const router = Router();

const executeProcedure = async (query: string) => {
  const client = await db.connect();
  try {
    let notices: string[] = [];

    client.on('notice', (msg) => {
      if (msg.message)
        notices.push(msg.message);
    });

    await client.query(query);

    return notices;
  } catch (err) {
    console.error(err);
    throw new Error('Error executing the procedure');
  } finally {
    client.release();
  }
};

router.get('/employee-count-ranking', async (req, res): Promise<any> => {
  try {
    const notices: string[] = await executeProcedure('CALL get_employee_count_ranking()');
    return res.status(200).json({ message: 'Procedure executed successfully', notices });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error executing procedure', details: err.message });
  }
});

router.get('/managers-and-services', async (req, res): Promise<any> => {
  try {
    const notices = await executeProcedure('CALL list_managers_and_services()');
    return res.status(200).json({ message: 'Procedure executed successfully', notices });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error executing procedure', details: err.message });
  }
});

router.get('/top-5-services-by-payroll', async (req, res): Promise<any> => {
  try {
    const notices = await executeProcedure('CALL get_top_5_services_by_payroll()');
    return res.status(200).json({ message: 'Procedure executed successfully', notices });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error executing procedure', details: err.message });
  }
});

export default router;