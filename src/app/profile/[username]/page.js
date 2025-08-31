'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Ticket from '../../../components/Ticket';
import { getConcerts } from '../../../api/concertData';
import { Separator } from '../../../components/ui/separator';
import { Button } from '../../../components/ui/button';
import { followUser } from '../../../api/followerData';

export default function UserConcertsPage({ params }) {
  const [concerts, setConcerts] = useState([]);
  const { username } = params;

  useEffect(() => {
    getConcerts(username).then(setConcerts);
  }, [username]);

  return (
    <div className="w-screen">
      <Button onClick={() => followUser(username)}>Follow</Button>
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>{username}&apos;s Concerts</h1>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row gap-4 flex-wrap">
        {concerts.map((concert) => (
          <Ticket key={concert.id} concertObj={concert} />
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
