import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

export default function CalendarInput({ control, name, label = 'Date', placeholder = 'Pick a date' }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start w-full">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger className="w-full">
              <FormControl>
                <Button variant="outline" className={cn('w-full pl-3 text-left font-normal justify-between', !field.value && 'text-muted-foreground')}>
                  {field.value ? format(field.value, 'yyyy-MM-dd') : <span>{placeholder}</span>}
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar mode="single" selected={field.value} defaultMonth={field.value} onSelect={(date) => field.onChange(date)} captionLayout="dropdown" fromYear={new Date().getFullYear() - 80} toYear={new Date().getFullYear() + 5} />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

CalendarInput.propTypes = {
  // eslint-disable-next-line
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
