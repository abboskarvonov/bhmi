import { About } from "@/types/about";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import renderError from "@/utils/RenderError";
import { Label } from "@/Components/ui/label";
import RichEditor from "@/Components/ui/RichEditor";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";

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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Ma'lumotni o'zgartirish - ${about.name}`}
                </h2>
            }
        >
            <Head title={`Ma'lumotni o'zgartirish - ${about.name}`} />

            <div>
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
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

                            <div>
                                <Label>Content</Label>
                                <RichEditor
                                    value={data.content || ""}
                                    onChange={(val) => setData("content", val)}
                                    placeholder="Kontent kiriting..."
                                    minHeight={300}
                                />
                                {renderError(errors, "content")}
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <Label>Sahifa turi</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(value) =>
                                            setData("type", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sahifa turi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Jurnal haqida">
                                                    Jurnal haqida
                                                </SelectItem>
                                                <SelectItem value="Tahririyat a'zolari">
                                                    Tahririyat a'zolari
                                                </SelectItem>
                                                <SelectItem value="Maqola talablari">
                                                    Maqola talablari
                                                </SelectItem>
                                                <SelectItem value="Tahririyat nizomi">
                                                    Tahririyat nizomi
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {renderError(errors, "type")}
                                </div>
                                <div>
                                    {about.file_url ? (
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
