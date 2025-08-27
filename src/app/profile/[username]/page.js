'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Ticket from '../../../components/Ticket';
import { getConcerts } from '../../../api/concertData';

export default function UserConcertsPage({ params }) {
  const [concerts, setConcerts] = useState([]);
  const { username } = params;

  useEffect(() => {
    getConcerts(username).then(setConcerts);
  }, [username]);

  return (
    <div>
      <div className="text-center w-screen font-inconsolata mt-10 text-[22px]">
        <h1>Justin&apos;s Concerts</h1>
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        {concerts.map((concert) => (
          <Ticket key={concert.id} artistName={concert.artist.name} tourName={concert.tour_name} venue={concert.venue.name} city={concert.venue.city} state={concert.venue.state} date={concert.date} time={concert.time} />
        ))}
      </div>
    </div>
  );
}

UserConcertsPage.propTypes = {
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
