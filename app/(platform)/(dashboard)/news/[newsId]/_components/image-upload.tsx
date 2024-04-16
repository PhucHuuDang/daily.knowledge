"use client";

import { Camera } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [url, setUrl] = useState<string>();
  const handleUpload = (result: any) => {
    console.log(result);
    onChange?.(result.info.secure_url);
    setUrl(result.info.secure_url);
  };
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      options={{
        maxFiles: 1,
      }}
      uploadPreset="wowmbflf"
    >
      {({ cloudinary, open }) => {
        console.log(cloudinary);
        // console.log(widget);

        return (
          <div
            onClick={() => open?.()}
            className="relative z-50 w-56 h-28 rounded-3xl cursor-pointer hover:opacity-70 transition p-10 border-dashed  border-slate-400 flex bg-[#17191f] justify-center items-center gap-2 text-neutral-600 group/thumbnail hover:border-slate-200 "
          >
            <Camera className="text-slate-400 h-6 w-6 group-hover/thumbnail:text-slate-100 transition " />
            <div className="font-semibold text-slate-400 group-hover/thumbnail:text-slate-100 text-lg transition">
              Thumbnail
            </div>
            {value ||
              (url && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="Upload"
                    fill
                    style={{ objectFit: "cover", borderRadius: "16px" }}
                    src={value || url}
                  />
                </div>
              ))}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
