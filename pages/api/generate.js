const yup = require('yup');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 6 });
const db = require('../../lib/db');

export default async function handler(req, res) {
  const bodySchema = yup.object({
    url: yup.string().url().required()
  });

  req.body = await bodySchema.validate(req.body);
  const newId = uid();
  const { url } = req.body;

  const {
    rows: [result]
  } = await db.query(
    `/* SQL */
        insert into redirects (uid, url) values ($1, $2) returning *;`,
    [newId, url]
  );

  res.json({ result });
}
