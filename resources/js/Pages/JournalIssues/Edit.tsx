import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import renderError from "@/utils/RenderError";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Journal, JournalEditData } from "@/types/journal";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";

function Edit({ journal_issue }: { journal_issue: Journal }) {
    const { data, setData, post, put, errors, processing, progress } =
        useForm<JournalEditData>({
            id: journal_issue.id,
            name: journal_issue.name,
            date: journal_issue.date,
            file_url: "",
            created_at: journal_issue.created_at,
            updated_at: journal_issue.updated_at,
            _method: "PUT",
        });

    const handleRemoveFile = (e: React.FormEvent) => {
        e.preventDefault();
        if (journal_issue.file_url) {
            put(route("journal-issues.removeFile", journal_issue.id), {
                onSuccess: () => {
                    toast.success("Fayl muvaffaqiyatli o’chirildi!");
                    setData("file_url", "");
                },
                onError: () => {
                    toast.error("Faylni o’chirishda xatolik yuz berdi.");
                },
            });
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("journal-issues.update", journal_issue.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Ma'lumot muvaffaqiyatli o'zgartirildi!");
            },
            onError: (errors: any) => {
                toast.error("Xatolik yuz berdi!", {
                    description: errors.message || "Qaytadan urinib ko'ring.",
                });
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Jurnalni o'zgartirish - ${journal_issue.name}`}
                </h2>
            }
        >
            <Head title={`Jurnalni o'zgartirish - ${journal_issue.name}`} />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {renderError(errors, "name")}
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <Label>Sana</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !data.date &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                <CalendarIcon />
                                                {data.date ? (
                                                    format(
                                                        data.date,
                                                        "MM-dd-yyyy",
                                                    )
                                                ) : (
                                                    <span>Sanani tanlang</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-full p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    data.date || undefined
                                                }
                                                onSelect={(date) =>
                                                    setData(
                                                        "date",
                                                        date ?? undefined,
                                                    )
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {renderError(errors, "date")}
                                </div>
                                <div>
                                    {journal_issue.file_url ? (
                                        <div className="grid pt-6">
                                            <Button
                                                variant={"destructive"}
                                                onClick={handleRemoveFile}
                                            >
                                                Faylni o'chirish
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Label>Fayl yuklash</Label>
                                            <input
                                                type="file"
                                                className="w-full rounded-lg border text-xs file:text-xs dark:border-gray-500"
                                                onChange={(e) => {
                                                    if (
                                                        e.target.files &&
                                                        e.target.files[0]
                                                    ) {
                                                        setData(
                                                            "file_url",
                                                            e.target.files[0],
                                                        );
                                                    }
                                                }}
                                            />
                                            {renderError(errors, "file_url")}
                                        </div>
                                    )}
                                    {progress && (
                                        <progress
                                            value={progress.percentage}
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? "Yangilanmoqda..." : "Yangilash"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Edit;
