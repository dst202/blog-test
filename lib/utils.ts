'use server';

import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';
import { redirect } from 'next/navigation';

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_URL,
});

export async function submitEmail(formData: FormData) {
  const email = formData.get('email');

  if (!email && typeof email !== 'string') return;

  const subscriberHash = md5(`${email}`.toLowerCase());

  try {
    await mailchimp.lists.setListMember(
      `${process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID}`,
      `${subscriberHash}`,
      { email_address: `${email}`, status_if_new: 'subscribed' }
    );

    redirect('?message=You have successfully subscribed! 🎉');
  } catch (err) {
    console.log(err, 'errorrrrrrrrrrrrrrrr');
    // const errorResponse = JSON.parse(err.response.text);
    redirect(`?error&message=${'errorResponse.detail'}`);
  }
}
