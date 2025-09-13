'use client';

/* eslint-disable */

import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { parseISO, format } from 'date-fns';
import { TicketX, Pin, CopyPlus, ThumbsUp, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { addConcertToProfile, deleteConcert, getConcertLikes, pinConcert, unpinConcert } from '../api/concertData';
import { useAuth } from '../utils/context/authContext';
import { likeConcert, unlikeConcert } from '../api/likeData';
import { Badge } from '../components/ui/badge';
import LikesDialog from './likesDialog';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import DeleteDialog from './deleteDialog';
import AddToProfileDialog from './addToProfileDialog';

export default function Ticket({ concertObj, isEditable = false, pinnedCount }) {
  const [openLikes, setOpenLikes] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddToProfile, setOpenAddToProfile] = useState(false);
  const [isLiked, setIsLiked] = useState(concertObj.is_liked);
  const [likeCount, setLikeCount] = useState(concertObj.like_count);
  const [isPinned, setIsPinned] = useState(concertObj.pinned);

  const queryClient = useQueryClient();

  const {
    concert: { artist, tour_name, venue, date, time },
  } = concertObj;

  // Delete Concert
  const deleteConcertMutation = useMutation({
    mutationFn: () => deleteConcert(concertObj.id, user.username),
    onSuccess: () => {
      queryClient.invalidateQueries(['concerts', user.username]);
    },
  });

  // Add concert to profile
  const addToProfileMutation = useMutation({
    mutationFn: () => addConcertToProfile(concertObj.concert.id, user.username),
    onSuccess: () => {
      queryClient.invalidateQueries(['concerts', user.username]);
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: async (liked) => {
      if (liked) {
        return await unlikeConcert(concertObj.id);
      } else {
        return await likeConcert(concertObj.id);
      }
    },
    onMutate: async (liked) => {
      setIsLiked(!liked);
      setLikeCount((prev) => prev + (liked ? -1 : 1));
    },
    onError: (err, liked) => {
      setIsLiked(liked);
      setLikeCount((prev) => prev + (liked ? 1 : -1));
    },
    onSettled: () => {
      queryClient.invalidateQueries(['concertLikes', concertObj.id]);
    },
  });

  const togglePinMutation = useMutation({
    mutationFn: async (pinned) => {
      if (pinned) {
        return await unpinConcert(concertObj.id);
      } else {
        return await pinConcert(concertObj.id);
      }
    },
    onMutate: async (pinned) => {
      setIsPinned(!pinned);
      await queryClient.cancelQueries(['concerts', user.username]);
      const previousConcerts = queryClient.getQueryData(['concerts', user.username]);

      // Optimistically update the React Query cache
      // This is what makes the parent component update immediately
      queryClient.setQueryData(['concerts', user.username], (old = []) => {
        return old.map((concert) => (concert.id === concertObj.id ? { ...concert, pinned: !pinned } : concert));
      });

      // Return context for rollback
      return { previousConcerts };
    },
    onError: (err, pinned, context) => {
      // If the mutation fails, rollback both cache and local state
      if (context?.previousConcerts) {
        queryClient.setQueryData(['concerts', user.username], context.previousConcerts);
      }
      setIsPinned(pinned);
    },
    onSettled: () => {
      // Sync with server after mutation completes (success or failure)
      queryClient.invalidateQueries(['concerts', user.username]);
    },
  });

  // Get usernames for users who liked the concert
  const { data: likesData } = useQuery({
    queryKey: ['concertLikes', concertObj.id],
    queryFn: () => getConcertLikes(concertObj.id),
    enabled: likeCount > 0,
  });

  const likedByUsernames = likesData?.usernames ?? [];

  const onAddToProfileConfirm = () => {
    addToProfileMutation.mutate();
  };

  const onDeleteConfirm = () => {
    deleteConcertMutation.mutate();
  };

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

  const handleLikeToggle = async () => {
    toggleLikeMutation.mutate(isLiked);
  };

  const projectedPinnedCount = isPinned ? pinnedCount : pinnedCount + 1;
  const canPinMore = projectedPinnedCount > 3;
  const handlePinnedToggle = async () => {
    if (canPinMore) return;
    togglePinMutation.mutate(isPinned);
  };

  return (
    <div className="w-full min-h-[210px] border border-black flex flex-row rounded-lg overflow-hidden">
      <div className="flex-[1] bg-ticket-bg-left flex flex-col items-center gap-3 py-3 px-2">
        {isEditable ? (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" disabled={canPinMore} onClick={() => handlePinnedToggle()}>
                  <Pin fill={isPinned ? 'white' : 'none'} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{canPinMore ? 'Maximum 3 pinned concerts' : isPinned ? 'Remove from pinned concerts' : 'Add to pinned concerts'}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" onClick={() => setOpenDelete(true)}>
                  <TicketX />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Delete Concert</p>
              </TooltipContent>
            </Tooltip>
            <DeleteDialog open={openDelete} onOpenChange={setOpenDelete} concertObj={concertObj.concert} onDeleteConfirm={onDeleteConfirm} />
            {likeCount > 0 && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" onClick={() => setOpenLikes(true)}>
                        <User />
                      </Button>
                      {likeCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 rounded-full px-1 font-inconsolata tabular-nums bg-gray-300 text-black text-xs">{likeCount}</Badge>}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{likedByUsernames && likedByUsernames.length > 0 ? `Liked by ${likedByUsernames[0]}${likeCount > 1 ? ` and ${likeCount - 1} other${likeCount - 1 === 1 ? '' : 's'}` : ''}` : 'Liked'}</p>
                  </TooltipContent>
                </Tooltip>
                <LikesDialog open={openLikes} onOpenChange={setOpenLikes} userLikes={likedByUsernames} />
              </>
            )}
          </>
        ) : (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center" onClick={() => setOpenAddToProfile(true)}>
                  <CopyPlus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>I was there too</p>
              </TooltipContent>
            </Tooltip>
            <AddToProfileDialog open={openAddToProfile} onOpenChange={setOpenAddToProfile} concertObj={concertObj.concert} onAddToProfileConfirm={onAddToProfileConfirm} formattedDate={addToProfileDateFormat} />

            <Tooltip>
              <TooltipTrigger asChild>
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
