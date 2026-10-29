import {
    Field,
    FileField,
    FormActions,
    FormHeader,
    FormSection,
    FormShell,
} from "@/Components/Custom/Form";
import { Input } from "@/Components/ui/input";
import RichEditor from "@/Components/ui/RichEditor";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { ABOUT_TYPES } from "@/lib/aboutTypes";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { About } from "@/types/about";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

function Edit({ about }: { about: About }) {
    const { data, setData, post, put, errors, processing, progress } =
        useForm<About>({
            id: about.id,
            name: about.name,
            content: about.content,
            type: about.type,
            file_url: "",
            created_at: about.created_at,
            updated_at: about.updated_at,
            _method: "PUT",
        });

    const handleRemoveFile = (e: React.FormEvent) => {
        e.preventDefault();
        if (about.file_url) {
            put(route("abouts.removeFile", about.id), {
                onSuccess: () => {
                    toast.success("Fayl muvaffaqiyatli o'chirildi!");
                    setData("file_url", "");
                },
                onError: () => {
                    toast.error("Faylni o'chirishda xatolik yuz berdi.");
                },
            });
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("abouts.update", about.id), {
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
        typeof about.file_url === "string" && about.file_url !== ""
            ? about.file_url
            : null;

    return (
        <AuthenticatedLayout header={<h2>Jurnal ma'lumotlari</h2>}>
            <Head title={`Ma'lumotni o'zgartirish - ${about.name}`} />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Sahifa ma'lumotini tahrirlash"
                    description={about.name}
                    backHref={route("abouts.index")}
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2">
                        <FormSection title="Kontent">
                            <Field
                                label="Sarlavha"
                                htmlFor="name"
                                required
                                error={errors.name}
                            >
                                <Input
                                    id="name"
                                    value={data.name}
                                    placeholder="Sahifa sarlavhasi"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </Field>
                            <Field label="Matn" required error={errors.content}>
                                <RichEditor
                                    value={data.content || ""}
                                    onChange={(val) => setData("content", val)}
                                    placeholder="Kontent kiriting..."
                                    minHeight={360}
                                />
                            </Field>
                        </FormSection>
                    </div>

                    <div className="space-y-6">
                        <FormSection title="Sozlamalar">
                            <Field
                                label="Sahifa turi"
                                required
                                hint="Kontent saytning qaysi sahifasida chiqishini belgilaydi."
                                error={errors.type}
                            >
                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData("type", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sahifa turini tanlang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {ABOUT_TYPES.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FormSection>

                        <FormSection title="Ilova fayl">
                            <Field label="Fayl" error={errors.file_url}>
                                <FileField
                                    file={data.file_url}
                                    onChange={(file) =>
                                        setData("file_url", file ?? "")
                                    }
                                    currentPath={currentFile}
                                    onRemoveCurrent={handleRemoveFile}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    hint="PDF, DOC, DOCX, JPG yoki PNG · 5 MB gacha"
                                    progress={progress?.percentage}
                                />
                            </Field>
                        </FormSection>
                    </div>
                </div>

                <FormActions
                    cancelHref={route("abouts.index")}
                    processing={processing}
                    submitLabel="O'zgarishlarni saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Edit;
