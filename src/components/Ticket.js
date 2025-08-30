'use client';

/* eslint-disable */

import React from 'react';
import { Button } from '../components/ui/button';
import { parseISO, format } from 'date-fns';
import { TicketX, Pin } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { deleteConcert } from '../api/concertData';
import { useAuth } from '../utils/context/authContext';

export default function Ticket({ concertObj, isEditable = false, onUpdate }) {
  const { artist, tour_name, venue, date, time } = concertObj;
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

  const deleteThisConcert = () => {
    if (window.confirm(`Delete ${artist.name} at ${venue.name}?`)) {
      deleteConcert(concertObj.id, user.username).then(() => onUpdate(concertObj.id));
    }
    console.log('delete');
  };
  const combinedDateTime = `${date}T${time}`;
  const dateObj = parseISO(combinedDateTime);
  const formatted = format(dateObj, 'EEEE, MMMM d yyyy, h:mm a');
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
                <p>Pin to profile</p>
              </TooltipContent>
            </Tooltip>
            <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center opacity-0">2</Button>
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
          </>
        ) : (
          <>
            <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center">1</Button>
            <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center">2</Button>
            <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center">3</Button>
          </>
        )}
      </div>
      <div className="flex-[0_0_5px] bg-ticket-center-line"></div>
      <div className="flex-[6] relative bg-ticket-background">
        <div className="absolute inset-0 text-[11px] text-gray-300 leading-[18px] overflow-hidden opacity-95 select-none">
          <div className="transform -rotate-12 origin-top-left translate-x-[-50px] translate-y-[-20px] scale-110">{generateWatermarkRows()}</div>
        </div>

        <div className="relative z-10 ">
          <div className="mt-15 font-inconsolata text-black">
            <div className="font-semibold ml-16 text-[22px]">{artist.name.toUpperCase()}</div>
            <div className="ml-8 text-[19px]">{tour_name}</div>
            <div className="ml-16 text-[16px]">{venue.name}</div>
            <div className="ml-16 text-[16px]">
              {venue.city}, {venue.state}
            </div>
            <div className="ml-8 text-[19px]">{formatted}</div>
          </div>
        </div>
      </div>
      <div className="flex-[1/2] text-sm flex items-center justify-center bg-foreground">
        <div className="transform -rotate-90 whitespace-nowrap font-bold text-black font-inconsolata text-[16px]">
          <div>TICKET</div>
          <div>#002</div>
        </div>
      </div>
    </div>
  );
}
