import db from '$lib/db';
import { linksRowSchema } from '$lib/schemas';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const handlers = {
      POST: async () => {
        const body = linksRowSchema.validateSync(req.body);
        const { destination_url } = body;
        if (req.method === 'POST') {
          const sqlRes = await db.query(
            `/* SQL */
              insert into links
                ("uid", "destination_url")
              values
                ($1, $2)
              returning
                *
            `,
            [uid(), destination_url]
          );
          res.status(201).json(sqlRes.rows);
        }
      }
    };

    if (!handlers[req.method]) {
      return res.status(405).end();
    }

    await handlers[req.method]();
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json(err);
    } else {
      res.status(500).end();
    }
  }
}
