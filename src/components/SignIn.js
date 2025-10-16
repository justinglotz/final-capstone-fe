import React from 'react';
import { Ticket } from 'lucide-react';
import { signIn } from '../utils/auth';
import { Button } from './ui/button';

function Signin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Ticket size={200} />
      <div className="text-center">
        <h1>Welcome to ConcertCapsule</h1>
        <p>Click the button below to login!</p>
        <Button onClick={signIn} className="bg-gray-800">
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
