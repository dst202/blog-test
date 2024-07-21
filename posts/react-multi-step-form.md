---
title: 'Build a multi step form with React Hook Forms (Nextjs)'
slug: 'react-nextjs-multistep-form'
date: '2024-07-22'
description: 'Learn how to build a multi step form with schema validation using zod with React Hook Form in Nextjs.'
image: 'https://res.cloudinary.com/cortehz/image/upload/v1720994641/blog/pexels-photo-577585.webp'
tags: ['nextjs', 'reactjs', 'react-hook-form', 'zod']
---

Forms are inevitable if you do web development. My day-to-day in the last couple of weeks has seen me working with a lot of forms. Some of those have had to be simple forms that native HTML form elements can handle while others have needed to be a bit more complex. One of the forms have had to be a multi-step form. In this article, I will show you the approach I took to build a multi-step form with schema validation using [zod](https://zod.dev/) with [React Hook Form](https://www.react-hook-form.com/) in Nextjs.

Just show me the code? [Here's the repo](https://github.com/cortehz/multi-step-form)

## Setting up the project

We will be using [NextJs](http://nextjs.org) with [ShadcnUI](https://ui.shadcn.com/) for the UI components. First off, create a new Nextjs project and install the necessary dependencies:

```bash
npx create-next-app@latest multi-step-form --typescript --tailwind --eslint
```

This will ask a few questions, you can answer them as you see fit. I'm selecting the **src** directory, using the App Router, and import aliases configured with the default.

Next, cd into your project directory and initialize the ShadcnUI into your project:

```bash
npx shadcn-ui@latest init
```

This will prompt you to select a default theme. You can select any of the themes, I usually go with the defaults but without using css variables.

To use Shadcn components, we need to individually install them to our project. We will be using a few form components so go ahead and install those as well:

```bash
npx shadcn-ui@latest add button input select checkbox radio-group form
```

This will create add all the components in the **components/ui** directory.

### Setting up react-hook-form and zod

```bash
npm install react-hook-form @hookform/resolvers zod
```

Go ahead and start the development server:

```bash
npm run dev
```

Open up **src/app/page.tsx** and clear out the default boilerplate to start building out our form. For brevity, all out other components will live in the one file which will also be a client component.

**page.tsx:**

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
  );
}
```

Build out the form and zod schema:

```tsx
...

//create the schema outside the component
const schema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1),
    lastName: z.string(),
    email: z.string().email(),
  }),
  jobDescription: z.object({
    jobTitle: z.string().min(1),
    jobDescription: z.string().optional(),
    showJobDescription: z.boolean(),
  }),
  availability: z.object({
    isAvailable: z.boolean(),
  }),
  step: z.number(),
});

export default function Home() {

//initialize the form inside the component with the schema
const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: ''
      },
      jobDescription: {
        jobTitle: '',
        jobDescription: '',
        showJobDescription: false
      },
      availability: {
        isAvailable: false,
      },
    step: 1,
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

function onSubmit(data: z.infer<typeof schema>) {
      alert(JSON.stringify(data, null, 2));
}

...
```

The schema and form are now set up and the object keys will eventually translate to our steps in the form. This means our form will have three steps: personal information, job description, and availability.

Each of these steps will be a separate component that will be conditionally rendered based on the current step. Create components:

**PersonalInfo**:

```tsx
function PersonalInfo() {
  return <div>Personal info</div>;
}

function JobDescription() {
  return <div>Job description</div>;
}

function Availability() {
  return <div>Availability</div>;
}
```

Now, map the steps to the components by creating a steps object right under our schema definition:

```tsx
// Define the type of the step names
type StepNamesType = keyof Omit<z.infer<typeof schema>, 'step'>;

// Define the steps, each step is a component
const steps: { [key in StepNamesType]: React.ReactNode } = {
  personalInfo: <PersonalInfo />,
  jobDescription: <JobDescription />,
  availability: <Availability />,
};

// Define a mapping from step number to step name
const STEPS_TO_STEP_NAMES: { [key: number]: StepNamesType } = {
  1: 'personalInfo',
  2: 'jobDescription',
  3: 'availability',
};
```

Create a FormControls component with Next and Previous buttons and conditionally render the steps based on the current step:

```tsx

//update imports
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

...

function FormControls() {
  // Since we will use this inside the form,
  // we can get acccess to the form context using useFormContext
  const { control, setValue, getValues } = useFormContext();

  // Get the current step from the form values
  const step = getValues('step');

  // Get the current step name
  const currentStepName = STEPS_TO_STEP_NAMES[step];

  const isFirstStep = Object.keys(steps)[0] === currentStepName;
  const isLastStep = step === Object.keys(steps).length;

  return (
    <div className='flex w-full gap-6 justify-between'>
      <Button
        variant='outline'
        type='button'
        disabled={isFirstStep}
        onClick={() => setValue('step', step - 1)}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Previous
      </Button>
      {/* if it's not the last step else try submit the form */}
      {isLastStep ? (
        <Button variant='default' type='submit'>
          Save
        </Button>
      ) : (
        <Button
          // Change the button type to submit when it's the last step
          type='button'
          onClick={() => {
            setValue('step', step + 1);
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Next
        </Button>
      )}
    </div>
  );
}
```

Home:

```tsx
...
//update imports
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

...

export default function Home() {
...

...

  const currentStep = form.watch('step');
  const currentStepName = STEPS_TO_STEP_NAMES[currentStep];

  // update the children of main to include the Form component
  <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6 pt-6 w-full max-w-lg'
        >
          <FormControls />
        {steps[currentStepName]}
        </form>
      </Form>
    </main>

```

Clicking the next and previous button should correctly navigate through the right steps and display the corresponding components. Fill up these components with our actual form fields:

**PersonalInfo**:

```tsx
//Update imports
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

...

function PersonalInfo() {
  // Since we will use this inside the form,
  // we can get acccess to the form context using useFormContext
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof schema>>();

  return (
    <div className='grid grid-cols-2 gap-2'>
      {/* from the form control we can hook the inputs to the form via the name */}
      <FormField
        control={control}
        name='personalInfo.firstName'
        render={({ field }) => (
          <FormItem className='col-span-1'>
            <FormLabel>Firstname</FormLabel>
            <FormControl>
              <Input placeholder='Firstname' {...field} />
            </FormControl>
            {/* And access the formErrors and display them or not */}
            {errors?.personalInfo?.firstName && (
              <FormMessage title={errors.personalInfo.firstName.message} />
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='personalInfo.lastName'
        render={({ field }) => (
          <FormItem className='col-span-1'>
            <FormLabel>Lastname</FormLabel>
            <FormControl>
              <Input placeholder='Lastname' {...field} />
            </FormControl>
            {errors?.personalInfo?.lastName && (
              <FormMessage title={errors.personalInfo.lastName.message} />
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='personalInfo.email'
        render={({ field }) => (
          <FormItem className='col-span-2'>
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input placeholder='Email' {...field} />
            </FormControl>
            {errors?.personalInfo?.email && (
              <FormMessage title={errors.personalInfo.email.message} />
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
```

**JobDescription**:

```tsx
function JobDescription() {
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof schema>>();

  return (
    <div className='grid grid-cols-2 gap-2'>
      <FormField
        control={control}
        name='jobDescription.jobTitle'
        render={({ field }) => (
          <FormItem className='col-span-2'>
            <FormLabel>Job title</FormLabel>
            <FormControl>
              <Input placeholder='Job Title' {...field} />
            </FormControl>
            {errors?.jobDescription?.jobTitle && (
              <FormMessage title={errors.jobDescription.jobTitle.message} />
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='jobDescription.jobDescription'
        render={({ field }) => (
          <FormItem className='col-span-2'>
            <FormLabel>Job description</FormLabel>
            <FormControl>
              <Input placeholder='Job Description' {...field} />
            </FormControl>
            {errors?.jobDescription?.jobDescription && (
              <FormMessage
                title={errors.jobDescription.jobDescription.message}
              />
            )}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='jobDescription.showJobDescription'
        render={({ field }) => (
          <FormItem className='col-span-1'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className='ml-2'>Show description in profile?</FormLabel>
            {errors?.jobDescription?.showJobDescription && (
              <FormMessage
                title={errors.jobDescription.showJobDescription.message}
              />
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
```

**Availability**:

```tsx
function Availability() {
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<typeof schema>>();

  return (
    <div className='grid grid-cols-2 gap-2'>
      <FormField
        control={control}
        name='availability.isAvailable'
        render={({ field }) => (
          <FormItem className='col-span-1'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className='ml-2'>Are you open to new jobs</FormLabel>
            {errors?.availability?.isAvailable && (
              <FormMessage title={errors.availability.isAvailable.message} />
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
```

The form looks complete and if you fill up the required fields and get to the last step, you should see a save button and and alert with the form values when submitted. There's a but...

### Validating each step

It would be a better experience to validate each step before moving to the next step. Because if you reach the last step with errors, the submit just never works and you have to trace back to the step with the error.

In **FormControls**:

Update the next/save button to look like this

```tsx
//destructure additional properties getFieldState, trigger from the form context
const { setValue, trigger, getFieldState, getValues } = useFormContext();
...
   {/* if it's not the last step
      else submit the form (this will also trigger validation) */}
      {isLastStep ? (
        <Button variant='default' type='submit'>
          Save
        </Button>
      ) : (
        <Button
          // Change the button type to button when it's NOT the last step
          type='button'
          onClick={async (e) => {
            //prevents form submission from bubbling up to the submit button
            // and triggering the form submission one step ahead
            e.stopPropagation();
            e.preventDefault();

            //Trigger validation for the current step
            // and if there are no errors, move to the next step
            await trigger(currentStepName);
            const currentStepHasErrors = getFieldState(currentStepName).error;
            if (currentStepHasErrors) return;
            setValue('step', step + 1);
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Next
        </Button>
      )}

...

```

Every step will now immediately validate before moving to the next step. This to me is a better experience than having to track back or submit the form with these errors.

Some bonus steps will be moving the steps components to their own files and dynamically importing them if the bundle size is a concern. Also with the current setup, it becomes easier to add steps or remove steps but also show the current step in the UI - this was the exact reason for this particular approach. If you'd like to see how I add a component showing the current steps, get the full source code [here](https://github.com/cortehz/multi-step-form).

How would you build a multi-step form? Let me know in the comments below.
