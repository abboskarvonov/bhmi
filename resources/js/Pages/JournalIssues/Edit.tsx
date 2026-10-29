import {
    DateField,
    Field,
    FileField,
    FormActions,
    FormHeader,
    FormSection,
    FormShell,
} from "@/Components/Custom/Form";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Journal, JournalEditData } from "@/types/journal";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

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

    const currentFile =
        typeof journal_issue.file_url === "string"
            ? journal_issue.file_url
            : null;

    return (
        <AuthenticatedLayout header={<h2>Jurnallar</h2>}>
            <Head title={`Jurnalni o'zgartirish - ${journal_issue.name}`} />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Jurnal sonini tahrirlash"
                    description={journal_issue.name}
                    backHref={route("journal-issues.index")}
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2">
                        <FormSection title="Asosiy ma'lumotlar">
                            <Field
                                label="Son nomi"
                                htmlFor="name"
                                required
                                hint="Masalan: 2026-yil 11-son, Sentyabr"
                                error={errors.name}
                            >
                                <Input
                                    id="name"
                                    value={data.name}
                                    placeholder="2026-yil 11-son, Sentyabr"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </Field>
                            <Field
                                label="Chiqish sanasi"
                                error={errors.date}
                                className="sm:max-w-xs"
                            >
                                <DateField
                                    value={data.date}
                                    invalid={!!errors.date}
                                    onChange={(date) => setData("date", date)}
                                />
                            </Field>
                        </FormSection>
                    </div>

                    <FormSection title="Jurnal fayli">
                        <Field label="PDF fayl" error={errors.file_url}>
                            <FileField
                                file={data.file_url}
                                onChange={(file) =>
                                    setData("file_url", file ?? "")
                                }
                                currentPath={currentFile}
                                onRemoveCurrent={handleRemoveFile}
                                accept=".pdf,.doc,.docx"
                                hint="PDF, DOC yoki DOCX · 10 MB gacha"
                                progress={progress?.percentage}
                            />
                        </Field>
                    </FormSection>
                </div>

                <FormActions
                    cancelHref={route("journal-issues.index")}
                    processing={processing}
                    submitLabel="O'zgarishlarni saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Edit;
