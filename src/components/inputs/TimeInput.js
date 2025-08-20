import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export default function TimeInput({ control, name, label = 'Time', defaultValue = '19:00:00', width, step = '1', ...props }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="time" step={step} className={cn(`w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-${width}`, !field.value && 'text-muted-foreground')} {...field} {...props} value={field.value || defaultValue} />
          </FormControl>
          <FormMessage />
          <FormDescription className="ml-1"> optional </FormDescription>
        </FormItem>
      )}
    />
  );
}

TimeInput.propTypes = {
  // eslint-disable-next-line
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.string,
  step: PropTypes.string,
};
