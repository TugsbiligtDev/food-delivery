import { Facebook, Instagram } from "lucide-react";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-obsidian">
      <div className="h-10"></div>
      <div className="bg-cherry-red">
        <h2 className="py-4 text-3xl font-semibold leading-9 text-snow-white">
          Fresh fast delivered
        </h2>
      </div>
      <div className="px-24">
        <div className="flex justify-between my-13">
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={46}
              height={46}
              className="w-[46px]"
            />
            <h4 className="text-xl font-semibold text-snow-white">
              Nom <span className="text-cherry-red">Nom</span>
            </h4>
            <p className="text-sm text-cloude-gray">Swift delivery</p>
          </div>
          <div>
            <h5 className="footer-header">NOMNOM </h5>
            <p className="footer-text">Home </p>
            <p className="footer-text">Contact us</p>
            <p className="footer-text">Delivery zone</p>
          </div>
          <div>
            <h5 className="footer-header">FOLLOW US</h5>
            <div className="flex gap-3 mt-3 text-primary-foreground">
              <Facebook className="size-6" />
              <Instagram className="size-6" />
            </div>
          </div>
        </div>
        <div className="border-t border-t-[#F4F4F566] pb-10">
          <div className="flex justify-start gap-10 py-5 text-muted">
            <p>Copy right 2024©Nomnom LLC</p>
            <p>Privacy policy </p>
            <p>Terms and conditoin</p>
            <p>Cookie policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
