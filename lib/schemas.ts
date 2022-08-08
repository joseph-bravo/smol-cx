import { object, string } from 'yup';

export const linksRowSchema = object({
  uid: string(),
  destination_url: string().url().required()
});
