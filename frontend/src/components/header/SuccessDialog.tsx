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
  const handleBackToHome = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black flex flex-col items-center max-w-md gap-6 rounded-2xl border-0 p-8">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="font-bold text-2xl text-midnight-black leading-tight">
            Order Placed Successfully! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-end justify-center">
          <img src="/kid.png" alt="Happy delivery" width={150} height={250} />
        </div>

        <div className="flex justify-center">
          <DialogClose asChild>
            <Button
              onClick={handleBackToHome}
              className="w-[180px] bg-cloude-gray hover:bg-gray-200 pointer text-midnight-black font-medium py-3 rounded-full"
            >
              Back to Home
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
