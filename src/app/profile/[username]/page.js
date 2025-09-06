'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Ticket from '../../../components/Ticket';
import { getConcerts } from '../../../api/concertData';
import { Separator } from '../../../components/ui/separator';
import { Button } from '../../../components/ui/button';
import { followUser, unfollowUser, getFollowStatus } from '../../../api/followerData';

export default function UserConcertsPage({ params }) {
  const [concerts, setConcerts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(null);
  const { username } = params;

  useEffect(() => {
    getConcerts(username).then(setConcerts);
    console.log(concerts);
    getFollowStatus(username).then((res) => {
      setIsFollowing(res.is_following);
    });
  }, [username]);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await unfollowUser(username);
      setIsFollowing(false);
    } else {
      await followUser(username);
      setIsFollowing(true);
    }
  };

  return (
    <div className="w-screen">
      {isFollowing !== null && <Button onClick={handleFollowToggle}>{isFollowing ? 'Unfollow' : 'Follow'}</Button>}
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
