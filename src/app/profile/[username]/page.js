'use client';

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Ticket from '../../../components/Ticket';
import { getConcerts } from '../../../api/concertData';
import { Separator } from '../../../components/ui/separator';
import { Button } from '../../../components/ui/button';
import { followUser, unfollowUser, getFollowStatus } from '../../../api/followerData';

export default function UserConcertsPage({ params }) {
  const [isFollowing, setIsFollowing] = useState(null);

  const queryClient = useQueryClient();

  const { username } = params;

  // Get concerts by username
  const { data: concerts = [] } = useQuery({
    queryKey: ['concerts', username],
    queryFn: () => getConcerts(username),
    staleTime: 1000 * 60 * 5,
  });

  // Get follow status by username
  const { data: followStatus } = useQuery({
    queryKey: ['followStatus', username],
    queryFn: () => getFollowStatus(username),
  });

  const toggleFollowStatusMutation = useMutation({
    mutationFn: async (following) => {
      if (following) {
        return unfollowUser(username);
      }
      return followUser(username);
    },
    onMutate: async (following) => {
      setIsFollowing(!following);
    },
    onError: (err, following) => {
      setIsFollowing(following);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['followStatus', username]);
      queryClient.invalidateQueries(['feedItems']);
    },
  });

  useEffect(() => {
    if (followStatus) {
      setIsFollowing(followStatus.is_following);
    }
  }, [followStatus]);

  const { pinnedConcerts, unpinnedConcerts } = useMemo(
    () => ({
      pinnedConcerts: concerts.filter((concert) => concert.pinned),
      unpinnedConcerts: concerts.filter((concert) => !concert.pinned),
    }),
    [concerts],
  );

  const handleFollowToggle = async () => {
    toggleFollowStatusMutation.mutate(isFollowing);
  };

  return (
    <div className="w-full min-h-screen box-border">
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>{username}&apos;s Concerts</h1>
      </div>
      <div className="h-[40px] flex items-center justify-center">
        {isFollowing !== null && (
          <Button className="font-inconsolata w-[100px]" onClick={handleFollowToggle}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
      {pinnedConcerts.length > 0 && (
        <>
          <p className="font-inconsolata ml-2">Pinned</p>
          <div className="border-2 border-white rounded-lg h-[250px] p-4 overflow-y-auto max-w-full">
            <div className="flex flex-row -mx-1 flex-wrap">
              {pinnedConcerts.map((concert) => (
                <div key={concert.id} className="w-full md:w-1/3 px-2 flex justify-center items-center">
                  <Ticket key={concert.id} concertObj={concert} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {unpinnedConcerts.map((concert) => (
          <div key={concert.id} className="mb-1">
            <Ticket key={concert.id} concertObj={concert} />
          </div>
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
