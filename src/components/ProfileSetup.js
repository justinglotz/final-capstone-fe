'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import TextInput from './inputs/TextInput';
import { useAuth } from '../utils/context/authContext';
import { createUser } from '../api/userData';
import UsernameSearch from './inputs/UsernameSearch';

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export default function ProfileSetup() {
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    const updatedValues = {
      ...values,
      uid_firebase: user.uid,
    };
    createUser(updatedValues);
    router.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Complete Your Profile</h1>
      <Form {...form}>
        <UsernameSearch control={form.control} name="username" label="Username" placeholder="Username" />
        <TextInput control={form.control} name="first_name" label="First Name" placeholder="John" description="optional" />
        <TextInput control={form.control} name="last_name" label="Last Name" placeholder="Doe" description="optional" />
        <Button onClick={form.handleSubmit(onSubmit)}>Create Profile</Button>
      </Form>
    </div>
  );
}
