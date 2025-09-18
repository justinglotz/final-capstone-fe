'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Separator } from '../components/ui/separator';
import getNewsFeed from '../api/newsFeedData';
import FeedItem from '../components/feedItem';

export default function ConcertsPage() {
  const { data: feedItems = [], isPending } = useQuery({
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
        {isPending && (
          <div>
            <Spinner variant="circle" />
          </div>
        )}
        {!isPending &&
          feedItems.length > 0 &&
          feedItems.map((feedItem) => (
            <div key={feedItem.id} className="md:w-[500px]">
              <FeedItem feedItem={feedItem} />
            </div>
          ))}
        {!isPending && feedItems.length === 0 && <div className="text-gray-500 font-inconsolata">Your feed is empty. Follow other users to populate your feed.</div>}
      </div>
    </div>
  );
}
