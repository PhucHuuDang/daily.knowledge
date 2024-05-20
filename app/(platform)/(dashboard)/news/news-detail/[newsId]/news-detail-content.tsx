"use client";

import useExtensions from "@/components/form/rich-text-editor/use-extensions";
import { RichTextReadOnly } from "mui-tiptap";

interface NewsDetailContentProps {
  content: string;
}

export const NewsDetailContent = ({ content }: NewsDetailContentProps) => {
  const extensions = useExtensions();

  return <RichTextReadOnly extensions={extensions} content={content} />;
};
