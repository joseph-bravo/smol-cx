export default function handler(req, res) {
  console.log('req:', req);
  const { uid } = req.query;
  res.end(`Post: ${uid}`);
}
