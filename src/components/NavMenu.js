'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, TicketPlus, LogOut, CircleUserRound } from 'lucide-react'; // optional icon
import { useRouter } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { signOut } from '../utils/auth';
import UserSearchInput from './inputs/UserSearch';

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger: the hamburger icon */}
      <SheetTrigger asChild>
        <Button variant="ghost" className="fixed top-4 right-4 z-50 bg-black">
          <Menu style={{ width: '32px', height: '32px', color: 'white' }} />{' '}
        </Button>
      </SheetTrigger>

      {/* Sheet content */}
      <SheetContent side="right" className="w-80">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Main navigation menu</SheetDescription>
        </VisuallyHidden>
        {/* Menu items */}

        <nav className="flex flex-col gap-2 mt-12 font-inconsolata">
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
            variant="nav"
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
            variant="nav"
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
            variant="nav"
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
            variant="nav"
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
