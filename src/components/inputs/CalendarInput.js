import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

export default function CalendarInput({ control, name, label = 'Date', placeholder = 'Pick a date', width }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger>
              <FormControl>
                <Button variant="outline" className={cn(`w-full pl-3 text-left font-normal w-${width}`, !field.value && 'text-muted-foreground')}>
                  {field.value ? format(field.value, 'yyyy-MM-dd') : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar mode="single" selected={field.value} defaultMonth={field.value} onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : null)} captionLayout="dropdown" fromYear={new Date().getFullYear() - 80} toYear={new Date().getFullYear() + 5} />
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
