import { Article, ArticleEditData } from "@/types/article";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import renderError from "@/utils/RenderError";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Editor } from "@tinymce/tinymce-react";

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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Maqolani o'zgartirish - ${article.name}`}
                </h2>
            }
        >
            <Head title={`Maqolani o'zgartirish - ${article.name}`} />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        value={data.name}
                                        name="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {renderError(errors, "name")}
                                </div>
                                <div>
                                    <Label>Muallif</Label>
                                    <Input
                                        type="text"
                                        placeholder="Author"
                                        value={data.author}
                                        name="author"
                                        onChange={(e) =>
                                            setData("author", e.target.value)
                                        }
                                    />
                                    {renderError(errors, "author")}
                                </div>
                                <div>
                                    <Label>Maqola sahifalari</Label>
                                    <Input
                                        type="text"
                                        placeholder="Pages"
                                        value={data.pages}
                                        name="pages"
                                        onChange={(e) =>
                                            setData("pages", e.target.value)
                                        }
                                    />
                                    {renderError(errors, "pages")}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <Label>Jurnalni tanlang</Label>
                                    <Select
                                        value={data.journal_issue_id}
                                        onValueChange={(value) =>
                                            setData("journal_issue_id", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Jurnalni tanlang" />
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
                                    {renderError(errors, "journal_issue_id")}
                                </div>
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
                                                        date ?? null,
                                                    )
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {renderError(errors, "date")}
                                </div>
                                <div>
                                    {article.file_url ? (
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
                                            <Label>Maqola fayli</Label>
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

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <Label>Kalit so'zlar</Label>
                                    <Editor
                                        apiKey="s0vgoqkalulereysrmkj81mzmwi8gnefh974yy0emob0oj6m"
                                        init={{
                                            height: 300,
                                            plugins:
                                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                            toolbar:
                                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                        }}
                                        value={data.keywords || ""}
                                        onEditorChange={(content) => {
                                            setData("keywords", content);
                                        }}
                                    />
                                    {renderError(errors, "keywords")}
                                </div>
                                <div>
                                    <Label>Annotatsiya</Label>
                                    <Editor
                                        apiKey="s0vgoqkalulereysrmkj81mzmwi8gnefh974yy0emob0oj6m"
                                        init={{
                                            height: 300,
                                            plugins:
                                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                            toolbar:
                                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                        }}
                                        value={data.annotations || ""}
                                        onEditorChange={(content) => {
                                            setData("annotations", content);
                                        }}
                                    />
                                    {renderError(errors, "annotations")}
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
