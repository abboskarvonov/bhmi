import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { AboutCreateData } from "@/types/about";
import renderError from "@/utils/RenderError";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Editor } from "@tinymce/tinymce-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

function Create() {
    const { data, setData, post, errors, processing, transform } =
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
        } else if (typeof data.file_url === "string" && data.file_url !== "") {
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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Ma'lumot yaratish
                </h2>
            }
        >
            <Head title="Ma'lumot yaratish" />

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

                            <div>
                                <Label>Content</Label>
                                <Editor
                                    apiKey="s0vgoqkalulereysrmkj81mzmwi8gnefh974yy0emob0oj6m"
                                    init={{
                                        height: 300,
                                        plugins:
                                            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                        toolbar:
                                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                    }}
                                    value={data.content || ""}
                                    onEditorChange={(content) => {
                                        setData("content", content);
                                    }}
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
                                            <SelectValue placeholder="Sahifa turini tanlang" />
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
