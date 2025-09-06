'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Ticket from './Ticket';

export default function UserTicket({ concertItem }) {
  const createdAt = format(parseISO(concertItem.created_at), 'MMM d, yyyy, h:mm a');
  const router = useRouter();

  return (
    <div className="mb-1 shadow p-4 ">
      <button type="button" className="hover:text-gray-400 cursor-pointer" onClick={() => router.push(`/profile/${concertItem.username}`)}>
        <p className="font-semibold font-inconsolata text-lg">{concertItem.username}</p>
      </button>
      <Ticket
        concertObj={{
          ...concertItem.concert,
          user_concert_id: concertItem.id,
        }}
      />
      <p className="text-sm text-gray-400 ">Added {createdAt}</p>
    </div>
  );
}

UserTicket.propTypes = {
  concertItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    concert: PropTypes.shape({
      id: PropTypes.number.isRequired,
      artist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        spotify_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      venue: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        setlist_fm_id: PropTypes.string.isRequired,
      }).isRequired,
      tour_name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
