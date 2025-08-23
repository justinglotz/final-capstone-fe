import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PropTypes from 'prop-types';

export default function TextInput({ control, name, label, placeholder, description }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-[500px]">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription className="ml-1"> {description} </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

TextInput.propTypes = {
  // eslint-disable-next-line
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
};
