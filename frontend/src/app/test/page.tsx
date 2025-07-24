"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

const Page = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  return (
    <div className="bg-white text-black h-screen ">
      <div className="w-[500px] h-[300px] bg-blue-200 border rounded-3xl flex flex-col justify-center items-center gap-4">
        <h1>Upload file</h1>
        <input type="file" id="file-input" />
        <label htmlFor="file-input" className="p-5 rounded-full bg-gray-300 ">
          <Upload />
        </label>
      </div>
    </div>
  );
};

export default Page;

//https://youtu.be/UklSza8rido?si=jw3KRUscQvyDWHIF (yt video link)