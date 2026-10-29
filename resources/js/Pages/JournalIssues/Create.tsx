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
import { JournalCreateData } from "@/types/journal";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

function Create() {
    const { data, setData, post, errors, processing, progress, transform } =
        useForm<JournalCreateData>({
            name: "",
            date: null as Date | null,
            file_url: "",
        });

    transform((data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("date", data.date ? data.date.toISOString() : "");

        if (data.file_url && data.file_url instanceof File) {
            formData.append("file_url", data.file_url);
        }

        return formData;
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/dashboard/journal-issues", {
            onSuccess: () => {
                toast.success("Jurnal muvaffaqiyatli qo'shildi!", {
                    description: "Yangi jurnal tizimga qo'shildi.",
                });
            },
            onError: () => {
                toast.error("Xatolik yuz berdi!", {
                    description: "Jurnal qo'shishda muammo yuzaga keldi.",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2>Jurnallar</h2>}>
            <Head title="Jurnal yaratish" />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Yangi jurnal soni"
                    description="Son nomi, chiqish sanasi va to'liq PDF faylini kiriting."
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
                                    onChange={(date) =>
                                        setData("date", date ?? null)
                                    }
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
                    submitLabel="Jurnalni saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Create;
