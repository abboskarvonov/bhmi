import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import RichEditor from "@/Components/ui/RichEditor";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import renderError from "@/utils/RenderError";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { ArticleCreateData } from "@/types/article";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface JournalProps {
    journals: { id: string; name: string }[];
}

function Create({ journals }: JournalProps) {
    const { data, setData, post, errors, processing, transform } =
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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Maqola yaratish
                </h2>
            }
        >
            <Head title="Maqola yaratish" />

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
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <Label>Kalit so'zlar</Label>
                                    <RichEditor
                                        value={data.keywords || ""}
                                        onChange={(val) =>
                                            setData("keywords", val)
                                        }
                                        placeholder="Kalit so'zlarni kiriting..."
                                        minHeight={200}
                                    />
                                    {renderError(errors, "keywords")}
                                </div>
                                <div>
                                    <Label>Annotatsiya</Label>
                                    <RichEditor
                                        value={data.annotations || ""}
                                        onChange={(val) =>
                                            setData("annotations", val)
                                        }
                                        placeholder="Annotatsiya kiriting..."
                                        minHeight={200}
                                    />
                                    {renderError(errors, "annotations")}
                                </div>
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? "Yuborilmoqda..." : "Yaratish"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
