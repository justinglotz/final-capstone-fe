'use client';

import React, { useState, useEffect } from 'react';
import Ticket from '../components/Ticket';
import { getConcerts } from '../api/concertData';

export default function ConcertsPage() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    getConcerts('justinglotz').then(setConcerts);
  }, []);

  return (
    <div className="flex flex-row gap-4 flex-wrap justify-center">
      {concerts.map((concert) => (
        <Ticket key={concert.id} artistName={concert.artist.name} tourName={concert.tour_name} venue={concert.venue.name} city={concert.venue.city} state={concert.venue.state} date={concert.date} time={concert.time} />
      ))}
    </div>
  );
}
