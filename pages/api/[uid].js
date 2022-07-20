import db from '../../lib/db';
export default async function handler(req, res) {
  const { uid } = req.query;
  const {
    rows: [{ url }]
  } = await db.query(`select * from redirects where uid = $1`, [uid]);
  res.redirect(url);
}
