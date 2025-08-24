import React from 'react';
import Ticket from '../../components/Ticket';

export default function ConcertsPage() {
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <Ticket concertName="Jon Batiste" />
      <Ticket concertName="Jon Batiste" />
      <Ticket concertName="Jon Batiste" />
      <Ticket concertName="Jon Batiste" />
      <Ticket concertName="Jon Batiste" />
    </div>
  );
}
