"use client";

import { ForwardedRef, forwardRef, useCallback, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import type { EditorOptions } from "@tiptap/core";

import {
  RichTextEditor,
  insertImages,
  type RichTextEditorRef,
} from "mui-tiptap";

import EditorMenuControls from "./editor-menu-control";
import useExtensions from "./useExtentions";
import { Button } from "../../ui/button";

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

interface RichTextEditorFormProps {
  setSubmittedContent?: (content: any) => void;
  id: string;
}

export const RichTextEditorForm = forwardRef<
  RichTextEditorRef,
  RichTextEditorFormProps
>(({ setSubmittedContent, id }, ref) => {
  const rteRef = useRef<RichTextEditorRef>(null);
  const extensions = useExtensions({
    // placeholder: "Add your own content here...",
  });

  function isMutableRefObject<T>(
    ref: ForwardedRef<T>
  ): ref is React.MutableRefObject<T | null> {
    return ref !== null && typeof ref === "object" && "current" in ref;
  }

  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) {
        return;
      }

      // For the sake of a demo, we don't have a server to upload the files to,
      // so we'll instead convert each one to a local "temporary" object URL.
      // This will not persist properly in a production setting. You should
      // instead upload the image files to your server, or perhaps convert the
      // images to bas64 if you would like to encode the image data directly
      // into the editor content, though that can make the editor content very
      // large. You will probably want to use the same upload function here as
      // for the MenuButtonImageUpload `onUploadFiles` prop.
      const attributesForImageFiles = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    []
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          // Return true to treat the event as handled. We call preventDefault
          // ourselves for good measure.
          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles]
    );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          // Return true to mark the paste event as handled. This can for
          // instance prevent redundant copies of the same image showing up,
          // like if you right-click and copy an image from within the editor
          // (in which case it will be added to the clipboard both as a file and
          // as HTML, which Tiptap would otherwise separately parse.)
          return true;
        }

        // We return false here to allow the standard paste-handler to run.
        return false;
      },
      [handleNewImageFiles]
    );
  return (
    <>
      <RichTextEditor
        className="
            bg-[#1a1f25]
            pl-4
            border-0
            overflow-y-auto
            focus:border-[1px]
            caret-sky-600
            h-[500px]
            text-[#a8b3d0]
            text-base
            rounded-2xl
            focus:ring-0
            focus:ring-offset-0
            focus:ring-offset-slate-200
            focus:ring-slate-300
            focus:ring-opacity-50
            hover:bg-[#21262d]
            focus:bg-[#21262d]
            focus:border-slate-200
            focus-visible:ring-0
            focus-visible:ring-transparent
            transition
        "
        ref={ref}
        // extensions={[StarterKit]} // Or any Tiptap extensions you wish!
        extensions={extensions}
        content="<p>Share with us something...</p>" // Initial content for the editor
        // Optionally include `renderControls` for a menu-bar atop the editor:
        renderControls={() => <EditorMenuControls />}
        editorProps={{
          handleDrop,
          handlePaste,
        }}

        // (
        //     <MenuControlsContainer>
        //       <MenuSelectHeading />
        //       <MenuDivider />
        //       <MenuButtonBold />
        //       <MenuButtonItalic />
        //       <MenuButtonAlignCenter />
        //       {/* <MenuButtonAlignLeft /> */}\{/* <MenuBlac */}
        //       {/* <Block */}
        //       <MenuDivider />
        //       {/* Add more controls of your choosing here */}
        //     </MenuControlsContainer>
        //   )
      />

      <input
        id={id}
        name={id}
        value={rteRef.current?.editor?.getHTML() ?? "No Text found"}
        hidden
      />

      <Button
        onClick={() => {
          if (!isMutableRefObject(ref) || !ref.current) {
            return;
          }
          const htmlContent =
            rteRef.current?.editor?.getHTML() ?? "No HTML found.";
          console.log(htmlContent);
          if (setSubmittedContent) {
            setSubmittedContent(htmlContent);
          }
        }}
      >
        Log HTML
      </Button>
    </>
  );
});

RichTextEditorForm.displayName = "RichTextEditorForm";
