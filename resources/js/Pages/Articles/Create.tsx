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
import RichEditor from "@/Components/ui/RichEditor";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArticleCreateData } from "@/types/article";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface JournalProps {
    journals: { id: string; name: string }[];
}

function Create({ journals }: JournalProps) {
    const { data, setData, post, errors, processing, progress, transform } =
        useForm<ArticleCreateData>({
            name: "",
            author: "",
            pages: "",
            date: null as Date | null,
            journal_issue_id: "",
            keywords: "",
            annotations: "",
            file_url: "",
        });

    transform((data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("author", data.author);
        formData.append("pages", data.pages);
        formData.append("date", data.date ? data.date.toISOString() : "");
        formData.append("journal_issue_id", data.journal_issue_id.toString());
        formData.append("keywords", data.keywords);
        formData.append("annotations", data.annotations);

        if (data.file_url && data.file_url instanceof File) {
            formData.append("file_url", data.file_url);
        }

        return formData;
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/dashboard/articles", {
            onSuccess: () => {
                toast.success("Maqola muvaffaqiyatli qo'shildi!", {
                    description: "Yangi maqola tizimga qo'shildi.",
                });
            },
            onError: () => {
                toast.error("Xatolik yuz berdi!", {
                    description: "Maqola qo'shishda muammo yuzaga keldi.",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2>Maqolalar</h2>}>
            <Head title="Maqola yaratish" />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Yangi maqola"
                    description="Maqola ma'lumotlarini kiriting va jurnal soniga biriktiring."
                    backHref={route("articles.index")}
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="space-y-6 xl:col-span-2">
                        <FormSection title="Asosiy ma'lumotlar">
                            <Field
                                label="Maqola nomi"
                                htmlFor="name"
                                required
                                error={errors.name}
                            >
                                <Input
                                    id="name"
                                    value={data.name}
                                    placeholder="Maqola sarlavhasi"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </Field>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <Field
                                    label="Muallif(lar)"
                                    htmlFor="author"
                                    required
                                    error={errors.author}
                                    className="sm:col-span-2"
                                >
                                    <Input
                                        id="author"
                                        value={data.author}
                                        placeholder="F.I.Sh."
                                        onChange={(e) =>
                                            setData("author", e.target.value)
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Sahifalar"
                                    htmlFor="pages"
                                    required
                                    hint="Masalan: 12-18"
                                    error={errors.pages}
                                >
                                    <Input
                                        id="pages"
                                        value={data.pages}
                                        placeholder="12-18"
                                        onChange={(e) =>
                                            setData("pages", e.target.value)
                                        }
                                    />
                                </Field>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Mazmuni"
                            description="Saytdagi maqola sahifasida ko'rsatiladi."
                        >
                            <Field
                                label="Kalit so'zlar"
                                error={errors.keywords}
                            >
                                <RichEditor
                                    value={data.keywords}
                                    onChange={(val) => setData("keywords", val)}
                                    placeholder="Kalit so'zlarni kiriting..."
                                    minHeight={140}
                                />
                            </Field>
                            <Field
                                label="Annotatsiya"
                                error={errors.annotations}
                            >
                                <RichEditor
                                    value={data.annotations}
                                    onChange={(val) =>
                                        setData("annotations", val)
                                    }
                                    placeholder="Annotatsiya kiriting..."
                                    minHeight={260}
                                />
                            </Field>
                        </FormSection>
                    </div>

                    <div className="space-y-6">
                        <FormSection title="Nashr">
                            <Field
                                label="Jurnal soni"
                                required
                                error={errors.journal_issue_id}
                            >
                                <Select
                                    value={data.journal_issue_id}
                                    onValueChange={(value) =>
                                        setData("journal_issue_id", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Jurnal sonini tanlang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {journals.map((journal) => (
                                                <SelectItem
                                                    key={journal.id}
                                                    value={journal.id.toString()}
                                                >
                                                    {journal.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field
                                label="Nashr sanasi"
                                required
                                error={errors.date}
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

                        <FormSection title="Maqola fayli">
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
                </div>

                <FormActions
                    cancelHref={route("articles.index")}
                    processing={processing}
                    submitLabel="Maqolani saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Create;
