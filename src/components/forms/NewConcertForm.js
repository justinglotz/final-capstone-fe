'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const formSchema = z.object({
  artistName: z.string(),
  venueName: z.string(),
  date: z.date(),
  tourName: z.string(),
});

export default function NewConcertForm() {
  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // Submit handler
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="artistName"
          render={({ field }) => (
            <FormItem className="w-[500px]">
              <FormLabel>Artist Name</FormLabel>
              <FormControl>
                <Input placeholder="Search for an artist..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="venueName"
          render={({ field }) => (
            <FormItem className="w-[500px]">
              <FormLabel>Venue Name</FormLabel>
              <FormControl>
                <Input placeholder="Search for a venue..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <FormControl>
                    <Button variant="outline" className={cn('w-[500px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar mode="single" onSelect={field.onChange} captionLayout="dropdown" fromYear={new Date().getFullYear() - 80} toYear={new Date().getFullYear() + 5} />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
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
