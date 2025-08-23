import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PropTypes from 'prop-types';
import useUsernameAvailability from '../../utils/hooks/useUsernameAvailability';

export default function UsernameSearch({ control, name, label, placeholder, description }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const available = useUsernameAvailability(field.value);
        return (
          <FormItem className="w-[500px]">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormDescription className="ml-1">
              {description} {available !== null && <span className={`ml-2 font-semibold ${available ? 'text-green-600' : 'text-red-600'}`}>{available ? 'Username available' : 'Username taken'}</span>}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

UsernameSearch.propTypes = {
  // eslint-disable-next-line
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
};
