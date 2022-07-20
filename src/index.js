require('dotenv/config');
const yup = require('yup');
const express = require('express');
const errorMiddleware = require('./middlewares/error-middleware');
const db = require('./db');
const app = express();
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 6 });

app.use(express.json());

app.post('/api/generate', async (req, res, next) => {
  const bodySchema = yup.object({
    url: yup.string().url().required()
  });

  try {
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
  } catch (err) {
    next(err);
    return;
  }
});

app.get('/:uid', async (req, res, next) => {
  console.log('hi');
  try {
    const { uid } = req.params;
    const {
      rows: [{ url }]
    } = await db.query(
      `/* SQL */
      select "url" from redirects where uid = $1;`,
      [uid]
    );
    res.redirect(url);
  } catch (err) {
    next(err);
    return;
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
