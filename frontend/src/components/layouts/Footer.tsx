import { Facebook, Instagram } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#18181B] ">
      <div className="h-10"></div>
      <div className="bg-red">
        <h2
          className="font-semibold text-3xl text-[#FAFAFA]
        leading-9 py-4"
        >
          Fresh fast delivered
        </h2>
      </div>
      {/* contacts */}
      <div className="flex px-20 justify-between">
        {/* first */}
        <div>
          <img src="/logo.png" alt="logo" className="w-[46px]" />
          <h4 className="font-semibold text-xl text-[#FAFAFA]">
            Nom <span className="text-red">Nom</span>
          </h4>
          <p className="text-sm text-[#F4F4F5]">Swift delivery</p>
        </div>
        {/* second */}
        <div>
          <h5 className="footer-header">NOMNOM </h5>
          <p className="footer-text">Home </p>
          <p className="footer-text">Contact us</p>
          <p className="footer-text">Delivery zone</p>
        </div>
        {/* third */}
        <div className="">
          <h5 className="footer-header">NOMNOM</h5>
          <div className="flex text-[#FAFAFA]">
            <Facebook className="size-6" />
            <Instagram className="size-6" />
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="border-t border-t-[#F4F4F566]">
        <div className="text-[#71717A] flex justify-between">
          <p>Copy right 2024©Nomnom LLC</p>
          <p>Privacy policy </p>
          <p>Terms and conditoin</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
