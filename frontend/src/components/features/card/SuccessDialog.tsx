"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

const SuccessDialog = ({ open, onClose }: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center max-w-md gap-6 p-8 text-black bg-white border-0 rounded-2xl">
        <DialogHeader className="space-y-4 text-center">
          <DialogTitle className="text-2xl font-bold leading-tight text-midnight-black">
            Your order has been successfully placed!
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-end justify-center">
          <Image src="/kid.png" alt="Happy delivery" width={150} height={250} />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onClose}
            className="w-[180px] bg-cloude-gray hover:bg-gray-200 pointer text-midnight-black font-medium py-3 rounded-full"
          >
            Back to Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
