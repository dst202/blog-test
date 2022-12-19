---
title: 'Successfully Collecting Emails with Mailchimp in NextJS'
slug: 'email-subscriptions-with-mailchimp'
date: '2021-06-09'
description: 'Build an easily audience for you blog by collecting email subscriptions with Mailchimp API using NextJS.'
image: 'https://res.cloudinary.com/cortehz/image/upload/v1657960274/blog_images/main-image/graphQl.png'
tags: ['nextjs']
---

If you are looking to collect emails for your audience and keep them updated on your content, the Mailchimp API is a great tool to use in combination with NextJS.

First, you will need to sign up for a Mailchimp account by following this link: [Mailchimp Signup](https://mailchimp.com/signup/).

Once you have an account, you will need to obtain an API key. You can do this by following these instructions: [About API keys](https://mailchimp.com/help/about-api-keys/).

Next, you will need to obtain the server prefix from the logged in link on your browser tab. This will be in the format of https://XXX.admin.mailchimp.com/, where XXX represents your server prefix.

From the Mailchimp UI, you will want to create an audience and save the audience ID in your ENV variables. You can do this by following these instructions: [Create a new audience](https://mailchimp.com/help/create-audience/).

In your NextJS project, you will want to run the following installs:

```javascript
yarn add @mailchimp/mailchimp_marketing
```

```javascript
yarn add @types/mailchimp__mailchimp_marketing
```

Note: If you are using Typescript, you will want to include the second install as well.

Mailchimp uses MD5 hashing to encrypt the email address before sending it to the API. You will need to install the MD5 package to use this functionality. Run the following command to install the MD5 package:

```js
yarn add md5

yarn add @types/md5
```

Note: Only include the second install if you are using Typescript.

Next, you will want to set up your form inputs and handlers to collect emails and submit them to the Mailchimp API.

To do this, you will need to create a signup file in the API folder within the pages directory. This file will contain the code to send the email to the Mailchimp API. An example of this file is shown below:

```typescript
import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { email_address, status } = req.body;

  // Set the mailchimp config with your API key and server prefix
  mailchimp.setConfig({
    apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY, //add yout API key here
    server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_URL, //add server prefix here
  });

  //Encrypt the email address using the MD5 hashing algorithm
  const subscriberHash = md5(email_address.toLowerCase());

  // Set the Audience ID generated earlier to add email to that audience
  try {
    await mailchimp.lists.setListMember(
      process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID, // add your audience ID here
      subscriberHash,
      { email_address, status_if_new: status }
    );

    //Create a custom success message
    res.status(200).json({
      message: `You will receive article updates in ${email_address}`,
    });
  } catch (err) {
    const errorResponse = JSON.parse(err.response.text);
    return res.status(err.status).json({ message: errorResponse.title });
  }
}
```

Once you have this file set up, you can call it inside the form submit handler. An example of this is shown below:

```typescript

...


//set up state to hold email and response
 const [email, setEmail] = useState({
    email: '',
    subcriptionResponse: '',
    error: false,
    });


//handle form submit
 const handleSubmit = async () => {
    try {
      const signup = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email.email,
          status: 'subscribed',
        }),
      });
      const response = await signup.json();

      setEmail({
        email: '',
        subcriptionResponse: response.message,
        error: false,
      });
    } catch (error) {
      setEmail({ ...email, subcriptionResponse: error, error: true });
    }
  };

  ...
```

To call handleSubmit we can create a form and add an onSubmit handler to it. We have also added some very minor error handle to show some feedback. An example of this is shown below:

```jsx
...
            <form
              className='subscribe-form'
              onSubmit={(e) => {
                e.preventDefault();
                // Call the handleSubmit function
                handleSubmit();
              }}
            >
              <div className={'inputContainer'}>
                <Input
                  type={'email'}
                  placeholder={'Please enter your email address'}
                  value={email.email}
                  onChange={(e) =>
                    setEmail({ ...email, email: e.target.value })
                  }
                  required
                />
              </div>

              <Button label='Notify me' mode='primary' type={'submit'} />
            </form>
            <p style={{ color: email.error ? 'red' : 'green' }}>
              {email?.subcriptionResponse}
            </p>
...
```

Using the Mailchimp API is a great way to collect emails from your audience and add them to your Mailchimp lists. Whether you are using a CMS, a form builder tool, or the API directly, there are many options available to help you get started. With a little bit of setup and integration, you can easily build your email list and keep your audience engaged with your content.

Full code for this post can be found here [on Github](https://github.com/cortehz/nextjs-mailchimp-api)
