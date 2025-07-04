import { Facebook, Instagram } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary">
      <div className="h-10"></div>
      <div className="bg-destructive">
        <h2
          className="font-semibold text-3xl text-primary-foreground
        leading-9 py-4"
        >
          Fresh fast delivered
        </h2>
      </div>
      {/* contacts */}
      <div className="px-24">
        <div className="flex justify-between my-13">
          {/* first */}
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="logo" className="w-[46px]" />
            <h4 className="font-semibold text-xl text-primary-foreground">
              Nom <span className="text-destructive">Nom</span>
            </h4>
            <p className="text-sm text-secondary">Swift delivery</p>
          </div>
          {/* second */}
          <div>
            <h5 className="footer-header">NOMNOM </h5>
            <p className="footer-text">Home </p>
            <p className="footer-text">Contact us</p>
            <p className="footer-text">Delivery zone</p>
          </div>
          {/* third */}
          <div>
            <h5 className="footer-header">FOLLOW US</h5>
            <div className="flex text-primary-foreground mt-3 gap-3">
              <Facebook className="size-6" />
              <Instagram className="size-6" />
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="border-t border-t-[#F4F4F566] pb-10">
          <div className="text-muted flex justify-start gap-10 py-5">
            <p>Copy right 2024©Nomnom LLC</p>
            <p>Privacy policy </p>
            <p>Terms and conditoin</p>
            <p>Cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
