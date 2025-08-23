'use client';

/* eslint-disable */

import React from 'react';
import { Button } from '../components/ui/button';

export default function Ticket({ concertName }) {
  const generateWatermarkRows = () => {
    const rows = [];
    const rowCount = 16; // Enough rows to cover the height

    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <div key={i} className="whitespace-nowrap">
          {Array(20).fill('ConcertCapsule ').join('')}
        </div>,
      );
    }
    return rows;
  };
  return (
    <div className="w-[490px] h-[220px] border border-black flex flex-row rounded-lg overflow-hidden">
      <div className="flex-[1] bg-ticket-bg-left flex flex-col gap-2">
        <Button className="w-[60px] flex-1"> 1 </Button>
        <Button className="w-[60px] flex-1"> 2 </Button>
        <Button className="w-[60px] flex-1"> 3 </Button>
      </div>
      <div className="flex-[0_0_5px] bg-ticket-center-line"></div>
      <div className="flex-[6] relative bg-ticket-background">
        {/* Watermark background */}
        <div className="absolute inset-0 text-[11px] text-gray-300 leading-[18px] overflow-hidden opacity-90 select-none">
          <div className="transform -rotate-12 origin-top-left translate-x-[-50px] translate-y-[-20px] scale-110">{generateWatermarkRows()}</div>
        </div>

        {/* Ticket content would go here */}
        <div className="relative z-10 ">
          <div className="mt-18 text-[22px] font-inconsolata">
            <div className="font-semibold ml-16 text-[22px]">{concertName.toUpperCase()}</div>
            <div className="ml-10 text-[20px]">Jon Batiste Plays America</div>
            <div className="ml-16 text-[16px]">Opry House</div>
            <div className="ml-16 text-[16px]">Nashville, TN</div>
            <div className="ml-10 text-[20px]">OCTOBER 1, 2025, 7:30 PM</div>
          </div>
        </div>
      </div>
      <div className="flex-[1] text-sm flex items-center justify-center">
        <div className="transform -rotate-90 whitespace-nowrap font-bold text-black">
          <div>TICKET</div>
          <div>#002</div>
        </div>
      </div>
    </div>
  );
}
