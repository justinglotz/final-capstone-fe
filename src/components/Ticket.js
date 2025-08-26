'use client';

/* eslint-disable */

import React from 'react';
import { Button } from '../components/ui/button';
import { parseISO, format } from 'date-fns';

export default function Ticket({ artistName, tourName, venue, city, state, date, time }) {
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
  const combinedDateTime = `${date}T${time}`;
  const dateObj = parseISO(combinedDateTime);
  const formatted = format(dateObj, 'EEEE, MMMM d yyyy, h:mm a');
  return (
    <div className="w-[490px] h-[220px] border border-black flex flex-row rounded-lg overflow-hidden">
      <div className="flex-[1] bg-ticket-bg-left flex flex-col items-center gap-3 py-3">
        <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center">1</Button>
        <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center">2</Button>
        <Button className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center">3</Button>
      </div>
      <div className="flex-[0_0_5px] bg-ticket-center-line"></div>
      <div className="flex-[6] relative bg-ticket-background">
        {/* Watermark background */}
        <div className="absolute inset-0 text-[11px] text-gray-300 leading-[18px] overflow-hidden opacity-90 select-none">
          <div className="transform -rotate-12 origin-top-left translate-x-[-50px] translate-y-[-20px] scale-110">{generateWatermarkRows()}</div>
        </div>

        {/* Ticket content would go here */}
        <div className="relative z-10 ">
          <div className="mt-18 font-inconsolata text-black">
            <div className="font-semibold ml-16 text-[22px]">{artistName.toUpperCase()}</div>
            <div className="ml-10 text-[20px]">{tourName}</div>
            <div className="ml-16 text-[16px]">{venue}</div>
            <div className="ml-16 text-[16px]">
              {city}, {state}
            </div>
            <div className="ml-10 text-[20px]">{formatted}</div>
          </div>
        </div>
      </div>
      <div className="flex-[1] text-sm flex items-center justify-center bg-foreground">
        <div className="transform -rotate-90 whitespace-nowrap font-bold text-black font-inconsolata text-[16px]">
          <div>TICKET</div>
          <div>#002</div>
        </div>
      </div>
    </div>
  );
}
