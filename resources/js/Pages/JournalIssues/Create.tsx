import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import renderError from "@/utils/RenderError";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { JournalCreateData } from "@/types/journal";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";

function Create() {
    const { data, setData, post, errors, processing, transform } =
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
        } else if (typeof data.file_url === "string" && data.file_url !== "") {
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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Jurnal yaratish
                </h2>
            }
        >
            <Head title="Jurnal yaratish" />

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
                                    name="name"
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
                                    <Label>Fayl</Label>
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
