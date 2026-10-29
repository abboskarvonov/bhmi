import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MenuCreateData } from "@/types/menu";
import renderError from "@/utils/RenderError";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

function Create() {
    const { data, setData, post, errors, processing, transform } =
        useForm<MenuCreateData>({
            name: "",
            slug: "",
        });

    transform((data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("slug", data.slug);

        return formData;
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/dashboard/menus", {
            onSuccess: () => {
                toast.success("Menyu muvaffaqiyatli qo'shildi!", {
                    description: "Yangi menyu tizimga qo'shildi.",
                });
            },
            onError: () => {
                toast.error("Xatolik yuz berdi!", {
                    description: "Menyu qo'shishda muammo yuzaga keldi.",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Menyu yaratish
                </h2>
            }
        >
            <Head title="Menyu yaratish" />

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
                                    name="name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {renderError(errors, "name")}
                            </div>

                            <div>
                                <Label>Slug</Label>
                                <Input
                                    type="text"
                                    placeholder="Slug"
                                    value={data.slug}
                                    name="slug"
                                    onChange={(e) =>
                                        setData("slug", e.target.value)
                                    }
                                />
                                {renderError(errors, "slug")}
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
