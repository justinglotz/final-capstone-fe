import React from 'react';
import NewConcertForm from '../../../components/forms/NewConcertForm';

export default function CreateConcertPage() {
  return (
    <div className="flex flex-col w-screen mt-10">
      <h1 className="m-auto mb-4 text-2xl font-inconsolata">New Concert</h1>

      <NewConcertForm />
    </div>
  );
}
