'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import CalendarInput from '../inputs/CalendarInput';
import ArtistSearch from '../inputs/ArtistSearch';
import VenueSearch from '../inputs/VenueSearch';
import TimeInput from '../inputs/TimeInput';
import { createConcert } from '../../api/concertData';
import { useAuth } from '../../utils/context/authContext';

const artistSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const venueSchema = z.object({
  setlist_fm_id: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
});

const formSchema = z.object({
  artist: artistSchema,
  venue: venueSchema,
  date: z.date(),
  time: z.string().optional(),
  tourName: z.string().optional(),
});

export default function NewConcertForm() {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const createConcertMutation = useMutation({
    mutationFn: async (values) => {
      const payload = {
        ...values,
        date: format(values.date, 'yyyy-MM-dd'),
        uid_firebase: user.uid_firebase,
      };
      return createConcert(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concerts', user.username] });
      router.push('/my-concerts');
    },
  });

  function onSubmit(values) {
    createConcertMutation.mutate(values);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 m-auto w-full max-w-2xl px-4">
      <Form {...form}>
        <div className="w-full space-y-4">
          <ArtistSearch control={form.control} placeholder="Search for artists..." label="Artist Name" url="https://concert-capsule-api.onrender.com/artists/search" name="artist" />
          <VenueSearch control={form.control} placeholder="Search for venues..." label="Venue Name" url="https://concert-capsule-api.onrender.com/venues/search" name="venue" />
          <CalendarInput control={form.control} name="date" label="Event Date" placeholder="Choose a date" />
          <TimeInput control={form.control} name="time" label="Event Time" width="full" />
          <FormField
            control={form.control}
            name="tourName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tour Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tour name..." {...field} />
                </FormControl>
                <FormDescription className="ml-1"> optional </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
