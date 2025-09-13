'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Separator } from '../components/ui/separator';
import getNewsFeed from '../api/newsFeedData';
import FeedItem from '../components/feedItem';

export default function ConcertsPage() {
  const { data: feedItems = [] } = useQuery({
    queryKey: ['feedItems'],
    queryFn: () => getNewsFeed(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="w-full">
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>Feed</h1>
      </div>
      <Separator className="my-4" />
      <div className="w-full flex flex-col items-center">
        {feedItems.length > 0 &&
          feedItems.map((feedItem) => (
            <div key={feedItem.id} className="md:w-[500px]">
              <FeedItem feedItem={feedItem} />
            </div>
          ))}
      </div>
    </div>
  );
}
