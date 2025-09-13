'use client';

import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './ui/button';

export default function DeleteDialog({ open, onOpenChange, concertObj, onDeleteConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-inconsolata">
            Are you sure you want to delete <i>{concertObj.artist.name}</i> at <i>{concertObj.venue.name}</i>?
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mt-4">
          <Button className="w-1/2 transition-colors duration-200 hover:bg-ticket-background hover:text-black" onClick={() => onDeleteConfirm()}>
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

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  concertObj: PropTypes.shape({
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
};
