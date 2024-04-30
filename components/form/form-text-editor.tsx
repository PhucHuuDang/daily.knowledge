"use client";

import React, { SetStateAction, useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate, ReactEditor } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  BaseElement,
} from "slate";
import { cn } from "@/lib/utils";
import { withHistory } from "slate-history";

import {
  Button,
  Icon,
  Toolbar,
} from "@/app/(platform)/(dashboard)/_components/components";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";

interface HotKeysProps {
  [key: string]: string;
}

interface CustomElement extends BaseElement {
  align?: string; // Define align property
  type?: string; // Define type property
}

interface RichTextProps {
  editorProps?: any;
  id?: string;
  className?: string;
  placeholder?: string;
}

const HOTKEYS: HotKeysProps = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const MARK_BUTTON_ICON = [
  { format: "bold", icon: <Bold className="h-5 w-5" /> },
  { format: "italic", icon: <Italic className="h-5 w-5" /> },
  { format: "underline", icon: <Underline className="h-5 w-5" /> },
  { format: "code", icon: <Code className="h-5 w-5" /> },
];

const BLOCK_BUTTON_ICON = [
  { format: "heading-one", icon: <Heading1 className="h-5 w-5" /> },
  { format: "heading-two", icon: <Heading2 className="h-5 w-5" /> },
  { format: "block-quote", icon: <Quote className="h-5 w-5" /> },
  { format: "numbered-list", icon: <ListOrdered className="h-5 w-5" /> },
  { format: "bulleted-list", icon: <List className="h-5 w-5" /> },
  { format: "left", icon: <AlignLeft className="h-5 w-5" /> },
  { format: "center", icon: <AlignCenter className="h-5 w-5" /> },
  { format: "right", icon: <AlignRight className="h-5 w-5" /> },
  { format: "justify", icon: <AlignJustify className="h-5 w-5" /> },
];

export const FormRichTextEditor = ({
  editorProps,
  id,
  className,
  placeholder = "Enter some rich text…",
}: RichTextProps) => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  // const editor = useMemo(() => withReact(createEditor())), []);
  const [editor] = useState(() => withReact(createEditor()));
  const editorHook = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([]);

  // console.log({ editor });
  // console.log({ renderLeaf });
  // console.log({ renderElement });

  return (
    <Slate
      // id={id!}
      // name={id!}
      editor={(editor as any) || (editorProps as any)}
      onChange={(newValue) => {
        setTimeout(() => {
          // console.log({ newValue });
          setValue(newValue as any);
        }, 3000);
      }}
      initialValue={initialValue}
    >
      <Toolbar>
        {MARK_BUTTON_ICON.map(({ format, icon }) => (
          <MarkButton key={format} format={format} icon={icon} />
        ))}
        {BLOCK_BUTTON_ICON.map(({ format, icon }) => (
          <BlockButton key={format} format={format} icon={icon} />
        ))}
      </Toolbar>

      {/* <label>Test</label> */}

      <Editable
        // onKeyDownCapture={(e) => console.log(e.key)}
        id={id}
        name={id}
        value={editor as any}
        // placeholder={placeholder}
        className={cn(
          "focus:border-[1px] text-[#a8b3d0] p-1 pl-4 h-56 text-base bg-[#1a1f25] hover:bg-[#21262d] focus:bg-[#21262d] focus:border-slate-200 rounded-xl focus:ring-0 focus:ring-offset-0 focus:ring-offset-slate-200 focus:ring-slate-300 focus:ring-opacity-50 active:bg-[#2d333c] resize-none focus-visible:right-0 focus-visible:ring-offset-0 ring-0 outline-none shadow-sm ",
          className
        )}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="test"
        spellCheck
        // autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
      <input type="text" id={id} name={id} value={editor as any} hidden />
    </Slate>
  );
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as CustomElement).type!) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<CustomElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<CustomElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: any, format: any, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      // at: selection, // Pass selection directly
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any)[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  //   if (leaf.italic) {
  //     children = <em>{children}</em>;
  //   }
  if (leaf.fontStyle === "italic") {
    // Check for fontStyle property
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({
  format,
  icon: IconConfig,
}: {
  format: any;
  icon: React.ReactNode;
}) => {
  const editor = useSlate();
  return (
    <Button
      className=" rounded-lg p-1 hover:bg-slate-600 duration-150"
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event: KeyboardEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>
        {IconConfig}
        {/* <IconConfig /> */}
      </Icon>
    </Button>
  );
};

const MarkButton = ({
  format,
  icon,
}: {
  format: any;
  icon: React.ReactNode;
}) => {
  const editor = useSlate();
  return (
    <Button
      className="rounded-lg p-1 hover:bg-slate-600 duration-150"
      active={isMarkActive(editor, format)}
      onMouseDown={(event: KeyboardEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>
        {icon}
        {/* <IconConfig /> */}
      </Icon>
    </Button>
  );
};

interface DescendantDefined {
  type: string;
  children: DescendantChild[];
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  align?: string;
}

type DescendantChild = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
};

const initialValue: DescendantDefined[] = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
        bold: true,
      },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    // align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];
