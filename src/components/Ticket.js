'use client';

/* eslint-disable */

import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { parseISO, format } from 'date-fns';
import { TicketX, Pin, CopyPlus, ThumbsUp, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { addConcertToProfile, deleteConcert, getConcertLikes } from '../api/concertData';
import { useAuth } from '../utils/context/authContext';
import { likeConcert, unlikeConcert } from '../api/likeData';
import { Badge } from '../components/ui/badge';
import LikesDialog from './likesDialog';

export default function Ticket({ concertObj, isEditable = false, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(concertObj.is_liked);
  const [likeCount, setLikeCount] = useState(concertObj.like_count);
  const [userLikes, setUserLikes] = useState([]);
  const {
    concert: { artist, tour_name, venue, date, time },
  } = concertObj;
  const { user } = useAuth();
  const generateWatermarkRows = () => {
    const rows = [];
    const rowCount = 16;

    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <div key={i} className="whitespace-nowrap">
          {Array(20).fill('ConcertCapsule ').join('')}
        </div>,
      );
    }
    return rows;
  };

  useEffect(() => {
    if (likeCount > 0) {
      getConcertLikes(concertObj.id).then((data) => setUserLikes(data.usernames));
    } else {
      setUserLikes(null);
    }
  }, [likeCount, concertObj.id]);

  const watermarkRows = useMemo(() => generateWatermarkRows(), []);
  let formatted = '';
  let addToProfileDateFormat = '';

  if (time) {
    const combinedDateTime = `${date}T${time}`;
    const dateObj = parseISO(combinedDateTime);
    formatted = format(dateObj, 'EEEE, MMMM d yyyy, h:mm a');
    addToProfileDateFormat = format(dateObj, 'EEEE, MMMM d yyyy');
  } else {
    const dateObj = parseISO(date);
    formatted = format(dateObj, 'EEEE, MMMM d yyyy');
    addToProfileDateFormat = formatted;
  }

  const deleteThisConcert = () => {
    if (window.confirm(`Delete ${artist.name} at ${venue.name}?`)) {
      deleteConcert(concertObj.id, user.username).then(() => onUpdate(concertObj.id));
    }
  };

  const addToProfile = () => {
    if (window.confirm(`Did you also attend ${artist.name} at ${venue.name} on ${addToProfileDateFormat}?`)) {
      addConcertToProfile(concertObj.id, user.username);
    }
  };

  const handleLikeToggle = async () => {
    if (isLiked) {
      await unlikeConcert(concertObj.id);
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      await likeConcert(concertObj.id);
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <div className="w-[490px] h-[210px] border border-black flex flex-row rounded-lg overflow-hidden">
      <div className="flex-[1] bg-ticket-bg-left flex flex-col items-center gap-3 py-3">
        {isEditable ? (
          <>
            <Tooltip>
              <TooltipTrigger>
                <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center">
                  <Pin />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to pinned concerts</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" onClick={deleteThisConcert}>
                  <TicketX />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Delete Concert</p>
              </TooltipContent>
            </Tooltip>
            {likeCount > 0 && (
              <>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="relative">
                      <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" onClick={() => setOpen(true)}>
                        <User />
                      </Button>
                      {likeCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 rounded-full px-1 font-inconsolata tabular-nums bg-gray-300 text-black text-xs">{likeCount}</Badge>}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{userLikes && userLikes.length > 0 ? `Liked by ${userLikes[0]}${likeCount > 1 ? ` and ${likeCount - 1} other${likeCount - 1 === 1 ? '' : 's'}` : ''}` : 'Liked'}</p>
                  </TooltipContent>
                </Tooltip>
                <LikesDialog open={open} onOpenChange={setOpen} userLikes={userLikes} />
              </>
            )}
          </>
        ) : (
          <>
            <Tooltip>
              <TooltipTrigger>
                <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" onClick={addToProfile}>
                  <CopyPlus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>I was there too</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="relative">
                  <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" onClick={handleLikeToggle}>
                    <ThumbsUp fill={isLiked ? 'green' : 'none'} />
                  </Button>
                  {likeCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 rounded-full px-1 font-inconsolata tabular-nums bg-gray-300 text-black text-xs">{likeCount}</Badge>}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Like</p>
              </TooltipContent>
            </Tooltip>

            <Button className="w-12 h-12 rounded-md bg-black text-white flex items-ce</TooltipContent>nter justify-center opacity-0">3</Button>
          </>
        )}
      </div>
      <div className="flex-[0_0_5px] bg-ticket-center-line"></div>
      <div className="flex-[6] relative bg-ticket-background">
        <div className="absolute inset-0 text-[11px] text-gray-300 leading-[18px] overflow-hidden opacity-95 select-none">
          <div className="transform -rotate-12 origin-top-left translate-x-[-50px] translate-y-[-20px] scale-110">{watermarkRows}</div>
        </div>

        <div className="relative z-10 ">
          <div className="mt-15 font-inconsolata text-black">
            <div className="font-semibold ml-14 text-[22px]">{artist.name.toUpperCase()}</div>
            <div className="ml-6 text-[19px]">{tour_name}</div>
            <div className="ml-14 text-[16px]">{venue.name}</div>
            <div className="ml-14 text-[16px]">
              {venue.city}, {venue.state}
            </div>
            <div className="ml-6 text-[18.5px]">{formatted}</div>
          </div>
        </div>
      </div>
      <div className="flex-[1/2] text-sm flex items-center justify-center bg-foreground">
        <div className="transform -rotate-90 whitespace-nowrap font-bold text-black font-inconsolata text-[16px]">
          <div>TICKET</div>
          <div className="flex justify-center">#{concertObj.id}</div>
        </div>
      </div>
    </div>
  );
}
