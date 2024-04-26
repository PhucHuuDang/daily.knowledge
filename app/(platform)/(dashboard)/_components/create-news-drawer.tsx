"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateNews } from "@/hooks/use-create-news";
import { PreviewContent } from "../news/[newsId]/_components/preview-content";
import { FormSubmit } from "@/components/form/form-submit";
import { Newspaper } from "lucide-react";
import { IconType } from "react-icons";

import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useState } from "react";
import RichTextExample from "@/components/form/form-text-editor";
import { ImageUpload } from "../news/[newsId]/_components/image-upload";

export const CreatePost = () => {
  const createPost = useCreateNews();
  const [editor] = useState(() => withReact(createEditor()));

  // console.log(editor);

  const isOpen = useCreateNews((state) => state.isOpen);

  const onOpenChange = (e: boolean) => !e && createPost.onClose();

  const onSubmit = (formData: FormData) => {
    const test = formData.get("title");
    const content = formData.get("content") as string;
    const category = formData.get("category");
    console.log({ category, test, content });
  };
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  return (
    <Drawer shouldScaleBackground open={isOpen} onOpenChange={onOpenChange}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger> */}

      <Tabs defaultValue="content-part">
        <DrawerContent className="mx-auto bg-[#0e1217] border-slate-400 border-b-0 border-l-0 rounded-xl">
          {/* h-[95vh] */}
          <div className="mx-auto w-screen h-[90vh] bg-[#0e1217] p-10 overflow-auto">
            {/* <div className=""> */}
            <TabsList className="w-1/2 mx-auto grid grid-cols-2 bg-[#1a1f25] ">
              {/* <div className="w-1/2 mx-auto my-5 flex items-center text-white gap-x-10"> */}
              <TabsTrigger
                className="data-[state=active]:bg-slate-200/20 data-[state=active]:text-[#fff] data-[state=active]:shadow-sm"
                value="content-part"
              >
                CONTENT
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-slate-200/20 data-[state=active]:text-[#fff] data-[state=active]:shadow-md"
                value="preview-part"
              >
                PREVIEW
              </TabsTrigger>
              {/* </div> */}
            </TabsList>

            <TabsContent value="content-part">
              <form
                action={onSubmit}
                className="w-1/2 mx-auto my-5 border border-[#2d333c] p-8 rounded-xl"
              >
                <FormSubmit>Submit</FormSubmit>

                <div className="my-5">
                  <ImageUpload />
                </div>

                <div className="my-5">
                  <FormSelect
                    id="category"
                    className="
                    bg-[#21262d]
                    text-neutral-200
                "
                    icon={Newspaper as IconType}
                  />
                </div>

                <div className="my-5">
                  <FormInput
                    id="title"
                    label="Title*"
                    placeholder="Post title"
                    required
                    className="
                        py-6
                        w-full
                        focus:border-[1px]
                        border-0
                        border-l-rose-500
                        focus:border-l-slate-300
                        caret-sky-600
                        rounded-xl
                        focus:ring-0
                        focus:ring-offset-0
                        focus:ring-offset-slate-200
                        focus:ring-slate-300
                        focus:ring-opacity-50
                        shadow-inset-left-rose-500
                        text-lg
                        text-[#a8b3d0]
                        hover:text-[#fffff]
                        hover:bg-[#21262d]
                        bg-[#1a1f25]
                        focus:bg-[#21262d]
                        transition
                "
                  />
                </div>

                <div className="my-5">
                  <FormTextarea
                    id="content"
                    label="Content*"
                    placeholder="Post content*"
                    required
                    className="
                      bg-[#1a1f25]
                        pl-4
                        border-0
                        focus:border-[1px]
                        caret-sky-600
                        h-56
                        text-[#a8b3d0]
                        text-base
                        rounded-xl
                        focus:ring-0
                        focus:ring-offset-0
                        focus:ring-offset-slate-200
                        focus:ring-slate-300
                        focus:ring-opacity-50
                        hover:bg-[#21262d]
                        focus:bg-[#21262d]
                        focus:border-slate-200
                        transition
                "
                  />
                </div>
                {/* 
                <div>
                  <Slate editor={editor} initialValue={initialValue}>
                    <Editable className="bg-white" />
                  </Slate>
                </div> */}

                {/* <div className="my-8 p-3 rounded-xl">
                      <RichTextExample editorProps={editor} />
                    </div> */}
              </form>
            </TabsContent>
            {/* </div> */}
            <TabsContent value="preview-part">
              <PreviewContent />
            </TabsContent>
          </div>
        </DrawerContent>
      </Tabs>
    </Drawer>
  );
};
