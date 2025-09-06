'use client';

import React, { useState, useEffect, useMemo } from 'react';
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

  const { pinnedConcerts, unpinnedConcerts } = useMemo(
    () => ({
      pinnedConcerts: concerts.filter((concert) => concert.pinned),
      unpinnedConcerts: concerts.filter((concert) => !concert.pinned),
    }),
    [concerts],
  );

  const handlePinChange = (concertId, pinned) => {
    setConcerts((prevConcerts) => prevConcerts.map((concert) => (concert.id === concertId ? { ...concert, pinned } : concert)));
  };

  return (
    <div className="w-full min-h-screen box-border">
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>My Concerts</h1>
      </div>
      <p className="font-inconsolata">Pinned Concerts {pinnedConcerts.length}/3</p>
      <div className="border-2 border-white rounded-lg h-[250px] p-4 overflow-y-auto max-w-full">
        {pinnedConcerts.length > 0 ? (
          <div className="flex flex-row -mx-1 flex-wrap ">
            {pinnedConcerts.map((concert) => (
              <div key={concert.id} className="w-1/3 px-1 flex justify-center items-center">
                <Ticket key={concert.id} concertObj={concert} isEditable onUpdate={handleDeleteConcert} onPinChange={handlePinChange} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 font-inconsolata">No pinned concerts yet</div>
        )}
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-3 gap-2">
        {unpinnedConcerts.map((concert) => (
          <div key={concert.id} className="mb-1">
            <Ticket key={concert.id} concertObj={concert} isEditable onUpdate={handleDeleteConcert} onPinChange={handlePinChange} pinnedCount={pinnedConcerts.length} />
          </div>
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
