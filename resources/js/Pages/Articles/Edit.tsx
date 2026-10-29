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
import { Article, ArticleEditData } from "@/types/article";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface JournalProps {
    id: string;
    name: string;
}

interface Props {
    article: Article;
    journals: JournalProps[];
}

function Edit({ article, journals }: Props) {
    const { data, setData, post, put, errors, processing, progress } =
        useForm<ArticleEditData>({
            id: article.id,
            name: article.name,
            author: article.author,
            pages: article.pages,
            date: article.date,
            journal_issue_id: article.journal_issue_id?.toString() || "",
            keywords: article.keywords,
            annotations: article.annotations,
            file_url: null,
            _method: "PUT",
        });

    const handleRemoveFile = (e: React.FormEvent) => {
        e.preventDefault();
        if (article.file_url) {
            put(route("articles.removeFile", article.id), {
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
        post(route("articles.update", article.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Maqola muvaffaqiyatli o'zgartirildi!");
            },
            onError: (errors: any) => {
                toast.error("Xatolik yuz berdi!", {
                    description: errors.message || "Qaytadan urinib ko'ring.",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2>Maqolalar</h2>}>
            <Head title={`Maqolani o'zgartirish - ${article.name}`} />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Maqolani tahrirlash"
                    description={article.name}
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
                                    value={data.keywords || ""}
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
                                    value={data.annotations || ""}
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
                                        setData("file_url", file)
                                    }
                                    currentPath={article.file_url}
                                    onRemoveCurrent={handleRemoveFile}
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
                    submitLabel="O'zgarishlarni saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Edit;
