'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Ticket from '../../components/Ticket';
import { getConcerts } from '../../api/concertData';
import { Separator } from '../../components/ui/separator';
import { useAuth } from '../../utils/context/authContext';

export default function MyConcertsPage() {
  const [concerts, setConcerts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getConcerts(user.username).then(setConcerts);
  }, []);

  const handleDeleteConcert = (deletedConcertId) => {
    setConcerts((prevConcerts) => prevConcerts.filter((concert) => concert.id !== deletedConcertId));
  };

  return (
    <div className="w-screen">
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>My Concerts</h1>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row gap-4 flex-wrap">
        {concerts.map((concert) => (
          <Ticket key={concert.id} concertObj={concert} isEditable onUpdate={handleDeleteConcert} />
        ))}
      </div>
    </div>
  );
}

MyConcertsPage.propTypes = {
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
