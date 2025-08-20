'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CalendarInput from '../inputs/CalendarInput';
import ArtistSearch from '../inputs/ArtistSearch';
import VenueSearch from '../inputs/VenueSearch';

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
  tourName: z.string(),
});

export default function NewConcertForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Form {...form}>
        <ArtistSearch control={form.control} placeholder="Search for artists..." label="Artist Name" url="https://concert-capsule-api.onrender.com/artists/search" name="artist" />
        <VenueSearch control={form.control} placeholder="Search for venues..." label="Venue Name" url="https://concert-capsule-api.onrender.com/venues/search" name="venue" />
        <CalendarInput control={form.control} name="date" label="Event Date" placeholder="Choose a date" width="[500px]" />
        <FormField
          control={form.control}
          name="tourName"
          render={({ field }) => (
            <FormItem className="w-[500px]">
              <FormLabel>Tour Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter tour name..." {...field} />
              </FormControl>
              <FormDescription className="ml-1"> optional </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
      </Form>
    </div>
  );
}
