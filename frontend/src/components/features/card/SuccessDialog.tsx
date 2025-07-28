"use client";
import { Button } from "@/components/ui/button";
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
      <DialogContent className="flex flex-col items-center max-w-md gap-6 p-8 text-black bg-white border-0 rounded-2xl">
        <DialogHeader className="space-y-4 text-center">
          <DialogTitle className="text-2xl font-bold leading-tight text-midnight-black">
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
