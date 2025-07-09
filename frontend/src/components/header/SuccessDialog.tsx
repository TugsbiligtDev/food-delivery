"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessDialog = ({ open, onOpenChange }: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black flex flex-col items-center max-w-xl gap-4 rounded-lg border p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl text-midnight-black">
            Your order has been successfully placed !
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <img src="/kid.png" alt="Kid" width={150} height={250} />
        </div>
        <DialogClose asChild>
          <Button
            className="button bg-cloude-gray"
            onClick={() => onOpenChange(false)}
          >
            Back to home
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
