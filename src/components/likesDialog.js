'use client';

import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function LikesDialog({ open, onOpenChange, userLikes }) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-inconsolata">Users who liked this concert:</DialogTitle>
        </DialogHeader>
        {userLikes.map((like) => (
          <button key={like} type="button" className="hover:text-gray-400 cursor-pointer m-0 p-0" onClick={() => router.push(`/profile/${like}`)}>
            <span className="font-semibold font-inconsolata text-md m-0">{like}</span>
          </button>
        ))}
      </DialogContent>
    </Dialog>
  );
}

LikesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  userLikes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
