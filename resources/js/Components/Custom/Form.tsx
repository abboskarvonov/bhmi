import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Label } from "@/Components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { DragEvent, FormEvent, ReactNode, useRef, useState } from "react";
import {
    FiAlertCircle,
    FiArrowLeft,
    FiCalendar,
    FiExternalLink,
    FiFile,
    FiTrash2,
    FiUploadCloud,
    FiX,
} from "react-icons/fi";

/* ---------- Forma qobig'i ---------- */

// Ekran balandligini to'ldiradi, shunda saqlash paneli qisqa formalarda ham pastda turadi
export function FormShell({
    onSubmit,
    children,
}: {
    onSubmit: (e: FormEvent) => void;
    children: ReactNode;
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="flex min-h-[calc(100dvh-5.5rem)] flex-col gap-6 lg:min-h-[calc(100dvh-6rem)]"
        >
            {children}
        </form>
    );
}

/* ---------- Sahifa sarlavhasi ---------- */

export function FormHeader({
    title,
    description,
    backHref,
}: {
    title: string;
    description?: string;
    backHref: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <Link
                href={backHref}
                aria-label="Ortga"
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700"
            >
                <FiArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-gray-900">
                    {title}
                </h1>
                {description && (
                    <p className="mt-0.5 text-sm text-gray-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

/* ---------- Bo'lim (karta) ---------- */

export function FormSection({
    title,
    description,
    children,
    className,
}: {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className="rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                <h2 className="font-semibold text-gray-900">{title}</h2>
                {description && (
                    <p className="mt-0.5 text-sm text-gray-500">
                        {description}
                    </p>
                )}
            </div>
            <div className={cn("space-y-5 p-5 sm:p-6", className)}>
                {children}
            </div>
        </section>
    );
}

/* ---------- Maydon ---------- */

export function Field({
    label,
    htmlFor,
    required,
    hint,
    error,
    children,
    className,
}: {
    label: string;
    htmlFor?: string;
    required?: boolean;
    hint?: string;
    error?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("space-y-2", className)}>
            <Label htmlFor={htmlFor} className="text-gray-700">
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
            </Label>
            {children}
            {error ? (
                <p className="flex items-center gap-1.5 text-sm text-red-600">
                    <FiAlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {error}
                </p>
            ) : (
                hint && <p className="text-xs text-gray-500">{hint}</p>
            )}
        </div>
    );
}

/* ---------- Sana ---------- */

export function DateField({
    value,
    onChange,
    invalid,
}: {
    value: Date | string | null | undefined;
    onChange: (date: Date | undefined) => void;
    invalid?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const date = value ? new Date(value) : undefined;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "h-10 w-full justify-start rounded-lg text-left font-normal",
                        !date && "text-muted-foreground",
                        invalid && "border-red-300",
                    )}
                >
                    <FiCalendar className="h-4 w-4 text-gray-400" />
                    {date ? format(date, "dd.MM.yyyy") : "Sanani tanlang"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    locale={uz}
                    weekStartsOn={1}
                    selected={date}
                    defaultMonth={date}
                    onSelect={(selected) => {
                        onChange(selected);
                        setOpen(false);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

/* ---------- Fayl ---------- */

const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
        ? `${Math.round(bytes / 1024)} KB`
        : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function FileField({
    file,
    onChange,
    currentPath,
    onRemoveCurrent,
    accept,
    hint,
    progress,
}: {
    file: File | string | null | undefined;
    onChange: (file: File | null) => void;
    currentPath?: string | null;
    onRemoveCurrent?: (e: FormEvent) => void;
    accept?: string;
    hint?: string;
    progress?: number | null;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const selected = file instanceof File ? file : null;

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) onChange(dropped);
    };

    const fileRow = (
        name: string,
        meta: string,
        actions: ReactNode,
        tone: "current" | "new",
    ) => (
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-3">
            <span
                className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    tone === "current"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-sky-100 text-sky-700",
                )}
            >
                <FiFile className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                    {name}
                </p>
                <p className="text-xs text-gray-500">{meta}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">{actions}</div>
        </div>
    );

    return (
        <div className="space-y-3">
            {currentPath ? (
                fileRow(
                    currentPath.split("/").pop() ?? currentPath,
                    "Joriy fayl",
                    <>
                        <Button
                            asChild
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500"
                            title="Ko'rish"
                        >
                            <a
                                href={`/storage/${currentPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FiExternalLink className="h-4 w-4" />
                            </a>
                        </Button>
                        {onRemoveCurrent && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                title="Faylni o'chirish"
                                onClick={onRemoveCurrent}
                            >
                                <FiTrash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </>,
                    "current",
                )
            ) : selected ? (
                fileRow(
                    selected.name,
                    `${formatSize(selected.size)} · saqlanganda yuklanadi`,
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500"
                        title="Bekor qilish"
                        onClick={() => {
                            onChange(null);
                            if (inputRef.current) inputRef.current.value = "";
                        }}
                    >
                        <FiX className="h-4 w-4" />
                    </Button>,
                    "new",
                )
            ) : (
                <label
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors",
                        dragging
                            ? "border-emerald-400 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40",
                    )}
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <FiUploadCloud className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-gray-600">
                        <span className="font-semibold text-emerald-700">
                            Faylni tanlang
                        </span>{" "}
                        yoki shu yerga tashlang
                    </span>
                    {hint && (
                        <span className="text-xs text-gray-400">{hint}</span>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        className="sr-only"
                        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                    />
                </label>
            )}

            {progress != null && (
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="h-full rounded-full bg-emerald-500 transition-[width]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}

/* ---------- Saqlash paneli ---------- */

export function FormActions({
    cancelHref,
    processing,
    submitLabel,
    processingLabel = "Saqlanmoqda...",
}: {
    cancelHref: string;
    processing: boolean;
    submitLabel: string;
    processingLabel?: string;
}) {
    return (
        <div
            data-form-actions
            className="sticky bottom-0 z-10 -mx-4 -mb-6 mt-auto border-t border-gray-200/80 bg-white/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:-mb-8 lg:px-8"
        >
            <div className="flex items-center justify-end gap-3">
                <Button asChild variant="outline" className="rounded-xl">
                    <Link href={cancelHref}>Bekor qilish</Link>
                </Button>
                <Button
                    type="submit"
                    disabled={processing}
                    className="min-w-32 rounded-xl"
                >
                    {processing ? processingLabel : submitLabel}
                </Button>
            </div>
        </div>
    );
}
