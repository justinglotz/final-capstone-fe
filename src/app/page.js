'use client';

import React, { useEffect, useState } from 'react';
import { Separator } from '../components/ui/separator';
import getNewsFeed from '../api/newsFeedData';
import Ticket from '../components/Ticket';

export default function ConcertsPage() {
  const [feedItems, setFeedItems] = useState([]);
  useEffect(() => {
    getNewsFeed().then((feed) => setFeedItems(feed));
  }, []);
  return (
    <div className="w-screen">
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>Feed</h1>
      </div>
      <Separator className="my-4" />
      <div className="w-full flex flex-col items-center">
        {feedItems.map((feedItem) => (
          <>
            <Ticket key={feedItem.id} concertObj={feedItem.concert} />
            <p>{feedItem.username}</p>
            <p>{feedItem.created_at}</p>
          </>
        ))}
      </div>
    </div>
  );
}
