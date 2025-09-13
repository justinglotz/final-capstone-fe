import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { User } from 'lucide-react';
import PropTypes from 'prop-types';
import { useSearch } from '../../utils/hooks/useSearch';

const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}users/search`;

export default function UserSearchInput({ placeholder = 'Find other users by username', onSelect, className }) {
  const { query, setQuery, results } = useSearch(`${endpoint}`, '', 300, 'username');
  const [open, setOpen] = useState(false);

  const handleSelect = (user) => {
    setQuery(user.username);
    setOpen(false);
    if (onSelect) {
      onSelect(user);
    }
  };

  return (
    <div className="relative w-[80%] mx-auto">
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(e.target.value.length > 0);
        }}
        onFocus={() => query.length > 0 && setOpen(true)}
        className={className}
      />

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-black border border-white rounded-md shadow-lg">
          <Command>
            <CommandList className="max-h-48">
              <CommandEmpty className="bg-black text-white my-auto text-center text-[14px]">No users found.</CommandEmpty>
              <CommandGroup className="bg-black">
                {results.map((user) => (
                  <CommandItem key={user.username} value={user.username} onSelect={() => handleSelect(user)} className="cursor-pointer data-[selected=true]:bg-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-white">{user.username}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}

UserSearchInput.propTypes = {
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  className: PropTypes.string,
};
