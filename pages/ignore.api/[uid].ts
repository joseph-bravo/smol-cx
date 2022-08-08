import db from '$lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;
  const {
    rows: [{ url }]
  } = await db.query(`select * from redirects where uid = $1`, [uid]);
  res.redirect(url);
}
