import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';
import { useSearch } from '../../utils/hooks/useSearch';

export default function ArtistSearch({ control, placeholder = 'Search...', label, url, name, description }) {
  const { query, setQuery, results } = useSearch(url);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger>
              <FormControl>
                <Button variant="outline" role="combobox" className={cn('w-[500px] justify-between', !field.value && 'text-muted-foreground')}>
                  {field.value ? field.value?.name : `Select artist`}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
              <Command>
                <CommandInput placeholder={placeholder} className="h-9" value={query} onValueChange={(value) => setQuery(value)} />
                <CommandList>
                  <CommandEmpty>No artists found.</CommandEmpty>
                  <CommandGroup>
                    {results.map((result) => (
                      <CommandItem
                        className="flex justify-between"
                        value={result.name}
                        key={result.id}
                        onSelect={() => {
                          field.onChange(result);
                        }}
                      >
                        <div className="flex justify-between flex-1 text-black">
                          <span className="max-w-[60%] truncate">{result.name}</span>
                        </div>
                        <Check className={cn('ml-auto', field.value && result.id === field.value?.id ? 'opacity-100' : 'opacity-0')} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

ArtistSearch.propTypes = {
  // eslint-disable-next-line
  control: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};
