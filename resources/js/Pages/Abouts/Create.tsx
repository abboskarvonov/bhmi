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
import { AboutCreateData } from "@/types/about";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

function Create() {
    const { data, setData, post, errors, processing, progress, transform } =
        useForm<AboutCreateData>({
            name: "",
            type: "",
            content: "",
            file_url: "",
        });

    transform((data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("content", data.content);

        if (data.file_url && data.file_url instanceof File) {
            formData.append("file_url", data.file_url);
        }

        return formData;
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/dashboard/abouts", {
            onSuccess: () => {
                toast.success("Ma'lumot muvaffaqiyatli qo'shildi!", {
                    description: "Yangi ma'lumot tizimga qo'shildi.",
                });
            },
            onError: () => {
                toast.error("Xatolik yuz berdi!", {
                    description: "Ma'lumot qo'shishda muammo yuzaga keldi.",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2>Jurnal ma'lumotlari</h2>}>
            <Head title="Ma'lumot yaratish" />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Yangi sahifa ma'lumoti"
                    description="Saytdagi “Jurnal haqida”, “Tahririyat a'zolari” kabi sahifalar kontenti."
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
                                    value={data.content}
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
                    submitLabel="Saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Create;
