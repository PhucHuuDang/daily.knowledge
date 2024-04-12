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

interface SelectDemoProps {
  id: string;
  className?: string;
  placeholder?: string;
}

export function FormSelect({
  id,
  className,
  placeholder = "Select categories your post...",
}: SelectDemoProps) {
  return (
    <Select>
      <SelectTrigger
        className="bg-[#1a1f25] text-[#a8b3d0] border-0 focus:border-[2px] pl-4 focus:border-[#ffffff] py-1 hover:text-neutral-100 active:bg-[#2d333c] hover:bg-[#21262e] h-12 rounded-xl transition
      "
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectGroup className="">
          <SelectLabel className="text-xl">Post categories</SelectLabel>
          {POST_CATEGORIES.map((category) => (
            <SelectItem
              id={id}
              key={category.value}
              className={`hover:cursor-pointer focus:text-slate-200 py-3 focus:bg-slate-700 focus:opacity-75 
              transition`}
              textValue="test"
              value={category.value}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
