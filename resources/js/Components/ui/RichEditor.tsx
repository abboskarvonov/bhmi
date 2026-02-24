import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExt from "@tiptap/extension-underline";
import LinkExt from "@tiptap/extension-link";
import TextAlignExt from "@tiptap/extension-text-align";
import PlaceholderExt from "@tiptap/extension-placeholder";
import { TextStyle as TextStyleExt } from "@tiptap/extension-text-style";
import FontFamilyExt from "@tiptap/extension-font-family";
import ColorExt from "@tiptap/extension-color";
import HighlightExt from "@tiptap/extension-highlight";
import { useCallback, useEffect, useRef } from "react";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Eraser,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    Link,
    List,
    ListOrdered,
    Pilcrow,
    Redo2,
    Strikethrough,
    Underline,
    Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FONT_FAMILIES = [
    { label: "Standart", value: "" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Times New Roman", value: "Times New Roman, serif" },
    { label: "Courier New", value: "Courier New, monospace" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Tahoma", value: "Tahoma, sans-serif" },
];

interface RichEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: number;
}

interface ToolbarBtnProps {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}

function ToolbarBtn({
    onClick,
    active,
    disabled,
    title,
    children,
}: ToolbarBtnProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={cn(
                "rounded p-1.5 transition-colors",
                active
                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900"
                    : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600",
                disabled && "cursor-not-allowed opacity-40",
            )}
        >
            {children}
        </button>
    );
}

function Sep() {
    return (
        <span className="mx-0.5 inline-block h-5 w-px self-center bg-gray-300 dark:bg-gray-600" />
    );
}

export function RichEditor({
    value,
    onChange,
    placeholder,
    minHeight = 250,
}: RichEditorProps) {
    const lastValue = useRef(value);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
            }),
            UnderlineExt,
            LinkExt.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline cursor-pointer",
                },
            }),
            TextAlignExt.configure({
                types: ["heading", "paragraph"],
            }),
            PlaceholderExt.configure({
                placeholder: placeholder ?? "Matn kiriting...",
            }),
            TextStyleExt,
            FontFamilyExt,
            ColorExt,
            HighlightExt.configure({ multicolor: true }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            lastValue.current = html;
            onChange(html);
        },
        editorProps: {
            attributes: { class: "outline-none" },
        },
    });

    useEffect(() => {
        if (!editor) return;
        if (value !== lastValue.current && !editor.isFocused) {
            lastValue.current = value;
            editor.commands.setContent(value || "", false);
        }
    }, [value, editor]);

    const setLink = useCallback(() => {
        if (!editor) return;
        const prev = editor.getAttributes("link").href as string | undefined;
        const url = window.prompt("Havola URL kiriting:", prev ?? "https://");
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    const currentFontFamily =
        (editor?.getAttributes("textStyle").fontFamily as string | undefined) ??
        "";

    if (!editor) return null;

    return (
        <div className="overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5 dark:border-gray-600 dark:bg-gray-700">

                {/* Orqaga / Oldinga */}
                <ToolbarBtn
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Orqaga (Ctrl+Z)"
                >
                    <Undo2 size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Oldinga (Ctrl+Y)"
                >
                    <Redo2 size={14} />
                </ToolbarBtn>

                <Sep />

                {/* Font family */}
                <select
                    value={currentFontFamily}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                            editor.chain().focus().unsetFontFamily().run();
                        } else {
                            editor.chain().focus().setFontFamily(val).run();
                        }
                    }}
                    title="Shrift turi"
                    className="h-7 rounded border border-gray-300 bg-white px-1 text-xs text-gray-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                >
                    {FONT_FAMILIES.map((f) => (
                        <option key={f.value} value={f.value}>
                            {f.label}
                        </option>
                    ))}
                </select>

                <Sep />

                {/* Sarlavhalar */}
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().setParagraph().run()
                    }
                    active={editor.isActive("paragraph")}
                    title="Oddiy matn"
                >
                    <Pilcrow size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    active={editor.isActive("heading", { level: 2 })}
                    title="Sarlavha H2"
                >
                    <Heading2 size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    active={editor.isActive("heading", { level: 3 })}
                    title="Sarlavha H3"
                >
                    <Heading3 size={14} />
                </ToolbarBtn>

                <Sep />

                {/* Matn formatlash */}
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    title="Qalin (Ctrl+B)"
                >
                    <Bold size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    title="Kursiv (Ctrl+I)"
                >
                    <Italic size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    active={editor.isActive("underline")}
                    title="Ostiga chiziq (Ctrl+U)"
                >
                    <Underline size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive("strike")}
                    title="Ustiga chiziq"
                >
                    <Strikethrough size={14} />
                </ToolbarBtn>

                <Sep />

                {/* Matn rangi */}
                <label
                    title="Matn rangi"
                    className="relative flex cursor-pointer items-center"
                >
                    <span className="rounded p-1.5 text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 7l-5 13h2.5l1.5-4h8l1.5 4H20L15 7H9z"/>
                            <path d="M7.5 14l4.5-7 4.5 7"/>
                        </svg>
                    </span>
                    <div
                        className="absolute bottom-0.5 left-1 right-1 h-1 rounded"
                        style={{
                            backgroundColor:
                                (editor.getAttributes("textStyle")
                                    .color as string) || "#000000",
                        }}
                    />
                    <input
                        type="color"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        value={
                            (editor.getAttributes("textStyle")
                                .color as string) || "#000000"
                        }
                        onChange={(e) => {
                            editor
                                .chain()
                                .focus()
                                .setColor(e.target.value)
                                .run();
                        }}
                    />
                </label>

                {/* Highlight rangi */}
                <label
                    title="Matn fon rangi (highlight)"
                    className="relative flex cursor-pointer items-center"
                >
                    <span className="rounded p-1.5 text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600">
                        <Highlighter size={14} />
                    </span>
                    <div
                        className="absolute bottom-0.5 left-1 right-1 h-1 rounded"
                        style={{
                            backgroundColor:
                                (editor.getAttributes("highlight")
                                    .color as string) || "#ffff00",
                        }}
                    />
                    <input
                        type="color"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        value={
                            (editor.getAttributes("highlight")
                                .color as string) || "#ffff00"
                        }
                        onChange={(e) => {
                            editor
                                .chain()
                                .focus()
                                .setHighlight({ color: e.target.value })
                                .run();
                        }}
                    />
                </label>

                <Sep />

                {/* Hizalash */}
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    active={editor.isActive({ textAlign: "left" })}
                    title="Chapga"
                >
                    <AlignLeft size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    active={editor.isActive({ textAlign: "center" })}
                    title="Markazga"
                >
                    <AlignCenter size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    active={editor.isActive({ textAlign: "right" })}
                    title="O'ngga"
                >
                    <AlignRight size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().setTextAlign("justify").run()
                    }
                    active={editor.isActive({ textAlign: "justify" })}
                    title="Tekislash"
                >
                    <AlignJustify size={14} />
                </ToolbarBtn>

                <Sep />

                {/* Ro'yxatlar */}
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    active={editor.isActive("bulletList")}
                    title="Belgilangan ro'yxat"
                >
                    <List size={14} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    active={editor.isActive("orderedList")}
                    title="Raqamlangan ro'yxat"
                >
                    <ListOrdered size={14} />
                </ToolbarBtn>

                <Sep />

                {/* Havola */}
                <ToolbarBtn
                    onClick={setLink}
                    active={editor.isActive("link")}
                    title="Havola qo'shish / tahrirlash"
                >
                    <Link size={14} />
                </ToolbarBtn>

                <Sep />

                {/* Formatlashni tozalash */}
                <ToolbarBtn
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .clearNodes()
                            .unsetAllMarks()
                            .run()
                    }
                    title="Formatlashni tozalash"
                >
                    <Eraser size={14} />
                </ToolbarBtn>
            </div>

            {/* Muharrir maydoni */}
            <EditorContent
                editor={editor}
                style={{ minHeight }}
                className="tiptap-content cursor-text p-3 text-sm dark:bg-gray-800 dark:text-gray-100"
            />
        </div>
    );
}

export default RichEditor;
