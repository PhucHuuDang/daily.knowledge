"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POST_CATEGORIES } from "@/config/post-categories";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { useFormStatus } from "react-dom";

interface SelectDemoProps {
  id: string;
  className?: string;
  placeholder?: string;
  // icon?: React.ReactNode;
  disabled?: boolean;
  icon?: IconType;
}

export function FormSelect({
  id,
  className,
  placeholder = "Select categories your post...",
  disabled,
  icon: Icon,
}: SelectDemoProps) {
  const { pending } = useFormStatus();

  return (
    <Select disabled={pending || disabled}>
      <SelectTrigger
        className="bg-[#1a1f25] text-[#a8b3d0] border-0 focus:border-[2px] pl-4 focus:border-[#ffffff] py-1 hover:text-neutral-100 active:bg-[#2d333c] hover:bg-[#21262e] h-12 rounded-xl transition
      "
      >
        {/* {Icon && <Icon className="text-[#a8b3d0] text-lg" />} */}
        <div className="flex items-center gap-2">
          {Icon && <Icon />}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectGroup className="">
          <SelectLabel id={id} className="text-xl">
            Post categories
          </SelectLabel>
          {POST_CATEGORIES.map((category) => (
            <SelectItem
              id={id}
              key={category.value}
              disabled={pending || disabled}
              className={`hover:cursor-pointer focus:text-slate-200 py-3 focus:bg-slate-700 focus:opacity-75 
              transition`}
              // textValue="test"
              value={category.value}
            >
              {/* //! if we lack of name or id we get null value
               */}
              <input hidden value={category.value} id={id} name={id} />

              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
