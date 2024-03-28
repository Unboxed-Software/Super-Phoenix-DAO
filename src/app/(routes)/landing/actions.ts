'use server';

import axios from 'axios';
import { z } from 'zod';

export const addEmailToMailingList = async (_prevState: unknown, formData: FormData) => {
  const schema = z.object({
    mail: z.string().email(),
  });

  const parse = schema.safeParse({
    mail: formData.get('mail'),
  });

  if (!parse.success) {
    return { message: 'The email provided is not valid' };
  }

  try {
    await axios.put(
      'https://api.sendgrid.com/v3/marketing/contacts',
      { contacts: [{ email: `${parse.data.mail}` }], list_ids: [process.env.SENDGRID_MAILING_ID] },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.SENDGRID_SECRET}`,
        },
      },
    );
    return { message: 'Your email has been added to the mailing list' };
  } catch (_error: unknown) {
    return { message: 'Something went wrong, please try again' };
  }
};
