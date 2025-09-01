'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Ticket from './Ticket';

export default function FeedItem({ feedItem }) {
  const createdAt = format(parseISO(feedItem.created_at), 'MMM d, yyyy, h:mm a');
  const router = useRouter();

  return (
    <div className="mb-1 shadow p-4 ">
      <utton type="button" className="hover:text-gray-400 cursor-pointer" onClick={() => router.push(`/profile/${feedItem.username}`)}>
        <p className="font-semibold font-inconsolata text-lg">{feedItem.username}</p>
      </utton>
      <Ticket concertObj={feedItem.concert} />
      <p className="text-sm text-gray-400 ">Added {createdAt}</p>
    </div>
  );
}

FeedItem.propTypes = {
  feedItem: PropTypes.shape({
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
