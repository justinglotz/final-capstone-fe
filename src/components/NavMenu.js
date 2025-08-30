'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, TicketPlus, LogOut, CircleUserRound } from 'lucide-react'; // optional icon
import { useRouter } from 'next/navigation';
import { signOut } from '../utils/auth';
import UserSearchInput from './inputs/UserSearch';

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger: the hamburger icon */}
      <SheetTrigger asChild>
        <Button variant="ghost" className="fixed top-4 right-4 z-50">
          <Menu style={{ width: '32px', height: '32px' }} />{' '}
        </Button>
      </SheetTrigger>

      {/* Sheet content */}
      <SheetContent side="right" className="w-80">
        {/* Menu items */}

        <nav className="flex flex-col gap-2 mt-12 font-inconsolata">
          {/* <Input placeholder="Find other users by username"></Input> */}
          <UserSearchInput
            placeholder="Find other users by username"
            onSelect={(user) => {
              setOpen(false);
              setTimeout(() => {
                router.push(`/profile/${user.username}`);
              }, 200);
            }}
            className="font-inconsolata"
          />
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                router.push('/');
              }, 200);
            }}
          >
            HOME
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                router.push('/concerts/new');
              }, 200);
            }}
          >
            <TicketPlus />
            ADD CONCERT
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                router.push('/my-concerts');
              }, 200);
            }}
          >
            <CircleUserRound />
            MY CONCERTS
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
          >
            <LogOut />
            LOGOUT
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
