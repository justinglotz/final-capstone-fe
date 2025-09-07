import React from 'react';
import NewConcertForm from '../../../components/forms/NewConcertForm';

export default function CreateConcertPage() {
  return (
    <div className="flex flex-col w-full mt-10 px-4 sm:px-0">
      <h1 className="m-auto mb-4 text-2xl font-inconsolata">Add Concert</h1>

      <NewConcertForm />
    </div>
  );
}
