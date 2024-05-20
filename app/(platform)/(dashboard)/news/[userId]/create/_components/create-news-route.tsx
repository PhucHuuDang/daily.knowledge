"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormSubmit } from "@/components/form/form-submit";
import { Newspaper } from "lucide-react";
import { IconType } from "react-icons";

import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { useRef, useState } from "react";
import { FormRichTextEditor } from "@/components/form/form-text-editor";
import { ImageUpload } from "../../_components/image-upload";
import { PreviewContent } from "../../_components/preview-content";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useAction } from "@/hooks/use-action";
import { createNews } from "@/actions/create-news";
import { toast } from "sonner";
import { PostType } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormErrors } from "@/components/form/form-errors";
import { RichTextEditorForm } from "@/components/form/rich-text-editor/rich-text-editor-form";
import { RichTextEditorRef, RichTextReadOnly } from "mui-tiptap";
import useExtensions from "@/components/form/rich-text-editor/use-extensions";

interface CreateNewsRouteProps {
  orgId: string;
}

const CreateNewsRoute = ({ orgId }: CreateNewsRouteProps) => {
  const [editor] = useState(() => withReact(createEditor()));
  const router = useRouter();
  const { user } = useUser();

  const rteRef = useRef<RichTextEditorRef>(null);
  const extensions = useExtensions({
    // placeholder: "Add your own content here...",
  });

  // console.log({ user });

  const { fieldErrors, execute } = useAction(createNews, {
    onSuccess: (data) => {
      toast.success("create news success");
      router.push(`/news/${orgId}`);
    },
    onError: (error: any) => {
      toast.error("create news failed", error);
      console.log({ error });
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const imageUrl = formData.get("image") as string;
    const content = formData.get("content") as string;
    const category = formData.get("postType") as string;
    const contentEditor = formData.get("editor") as string;
    const authorImage = formData.get("authorImage") as string;

    // console.log({ content });

    // console.log({ imageUrl, title, category, content, contentEditor });

    execute({
      title,
      content,
      authorImage,
      image: imageUrl,
      censored: true,
      censoredBy: user?.username!,
      email: user?.emailAddresses[0].emailAddress!,
      published: true,
      postType: category as PostType,
    });
  };

  const [submittedContent, setSubmittedContent] = useState("");

  return (
    <div className="relative 2xl:static w-full h-full">
      <Tabs defaultValue="content-part" className="h-full">
        {/* bg-[#0e1217] */}
        <div className="mx-auto w-full h-full bg-gradient-to-r from-slate-900 to-slate-700 p-10">
          {/* <div className=""> */}
          <TabsList className="w-1/2 mx-auto grid grid-cols-2 bg-[#1a1f25] relative z-10 ">
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
            {/* *bg-gradient-to-r from-[#415a77] to-[#778da9] */}
            <form
              action={onSubmit}
              className="w-1/2 mx-auto my-5 border bg-slate-200/5 border-[#454f5e] p-8 rounded-xl shadow-2xl relative z-10"
            >
              <FormSubmit>Submit</FormSubmit>

              <input
                hidden
                id="authorImage"
                name="authorImage"
                value={user?.externalAccounts[0].imageUrl}
              />

              <div className="my-5">
                <ImageUpload id="image" />
                <FormErrors id="image" errors={fieldErrors} />
              </div>

              <div className="my-5">
                <FormSelect
                  id="postType"
                  className="
                    bg-[#21262d]
                    text-neutral-200
                "
                  icon={Newspaper as IconType}
                />

                <FormErrors id="postType" errors={fieldErrors} />
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
                <FormErrors id="title" errors={fieldErrors} />
              </div>

              {/* <div className="my-5">
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
              </div> */}

              <div className="my-5 ">
                <RichTextEditorForm
                  id="content"
                  ref={rteRef}
                  setSubmittedContent={setSubmittedContent}
                />
                <FormErrors id="content" errors={fieldErrors} />
              </div>
            </form>
            {/* <BackgroundBeams /> */}
          </TabsContent>
          {/* </div> */}
          <TabsContent value="preview-part">
            {/* <PreviewContent /> */}
            <RichTextReadOnly
              extensions={extensions}
              content={submittedContent}
            />
          </TabsContent>
        </div>
      </Tabs>
      <BackgroundBeams />
    </div>
  );
};

export default CreateNewsRoute;
