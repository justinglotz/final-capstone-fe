'use client';

import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './ui/button';

export default function AddToProfileDialog({ open, onOpenChange, concertObj, onAddToProfileConfirm, formattedDate }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-inconsolata">
            Did you also attend <i>{concertObj.artist.name}</i> at <i>{concertObj.venue.name}</i> on <i>{formattedDate}</i>?
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mt-4">
          <Button
            className="w-1/2 transition-colors duration-200 hover:bg-ticket-background hover:text-black"
            onClick={() => {
              onAddToProfileConfirm();
              onOpenChange(false);
            }}
          >
            Yes
          </Button>
          <Button className="w-1/2 transition-colors duration-200 hover:bg-ticket-background hover:text-black" onClick={() => onOpenChange(false)}>
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

AddToProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  formattedDate: PropTypes.string.isRequired,
  concertObj: PropTypes.shape({
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onAddToProfileConfirm: PropTypes.func.isRequired,
};
