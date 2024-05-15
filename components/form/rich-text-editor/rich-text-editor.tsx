"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";

import {
  MenuButtonAlignCenter,
  MenuButtonAlignLeft,
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  //   MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";
import { Button } from "../../ui/button";
import EditorMenuControls from "./editor-menu-control";
import useExtensions from "./useExtentions";

export const RichTextEditorForm = () => {
  const rteRef = useRef<RichTextEditorRef>(null);
  const extensions = useExtensions({
    // placeholder: "Add your own content here...",
  });

  const editor = useEditor({
    extensions: extensions,
    content: "<p>Hello world</p>",
  });

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
            h-96
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
        ref={rteRef}
        // extensions={[StarterKit]} // Or any Tiptap extensions you wish!
        extensions={extensions}
        content="<p>Share with us something...</p>" // Initial content for the editor
        // Optionally include `renderControls` for a menu-bar atop the editor:
        renderControls={() => <EditorMenuControls />}

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

      <Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>
        Log HTML
      </Button>
    </>
  );
};
