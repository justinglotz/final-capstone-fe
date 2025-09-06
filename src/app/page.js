'use client';

import React, { useEffect, useState } from 'react';
import { Separator } from '../components/ui/separator';
import getNewsFeed from '../api/newsFeedData';
import FeedItem from '../components/feedItem';

export default function ConcertsPage() {
  const [feedItems, setFeedItems] = useState([]);
  useEffect(() => {
    getNewsFeed().then((feed) => setFeedItems(feed));
  }, []);

  return (
    <div className="w-full">
      <div className="text-center font-inconsolata mt-10 text-[22px]">
        <h1>Feed</h1>
      </div>
      <Separator className="my-4" />
      <div className="w-full flex flex-col items-center">
        {feedItems.map((feedItem) => (
          <div className="w-1/3">
            <FeedItem key={feedItem.id} feedItem={feedItem} />
          </div>
        ))}
      </div>
    </div>
  );
}
