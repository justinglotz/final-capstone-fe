'use client';

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import Ticket from '../../components/Ticket';
import { getConcerts } from '../../api/concertData';
import { Separator } from '../../components/ui/separator';
import { useAuth } from '../../utils/context/authContext';

export default function MyConcertsPage() {
  const { user } = useAuth();

  const { data: concerts = [], isLoading } = useQuery({
    queryKey: ['concerts', user.username],
    queryFn: () => getConcerts(user.username),
  });

  const { pinnedConcerts, unpinnedConcerts } = useMemo(
    () => ({
      pinnedConcerts: concerts.filter((concert) => concert.pinned),
      unpinnedConcerts: concerts.filter((concert) => !concert.pinned),
    }),
    [concerts],
  );

  let pinnedContent;
  if (isLoading) {
    pinnedContent = <div className="flex items-center justify-center h-full text-gray-500 font-inconsolata">Loading...</div>;
  } else if (pinnedConcerts.length > 0) {
    pinnedContent = (
      <div className="flex flex-row -mx-1 flex-wrap ">
        {pinnedConcerts.map((concert) => (
          <div key={concert.id} className="w-full sm:w-[300px] md:w-1/3 px-1 py-1 flex justify-center items-center">
            <Ticket concertObj={concert} isEditable />
          </div>
        ))}
      </div>
    );
  } else {
    pinnedContent = <div className="flex items-center justify-center h-full text-gray-500 font-inconsolata">No pinned concerts yet</div>;
  }

  return (
    <div className="w-[90%] md:w-full min-h-screen box-border mx-auto">
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>My Concerts</h1>
      </div>
      <p className="font-inconsolata">Pinned Concerts {pinnedConcerts.length}/3</p>
      <div className="border-2 border-white rounded-lg min-h-[250px] max-h-[700px] p-4 overflow-y-auto max-w-full">{pinnedContent}</div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {unpinnedConcerts.map((concert) => (
          <div key={concert.id} className="w-full sm:w-[300px] md:w-full mb-1 mx-auto">
            <Ticket concertObj={concert} isEditable pinnedCount={pinnedConcerts.length} />
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
