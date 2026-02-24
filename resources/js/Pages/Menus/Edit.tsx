import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu } from "@/types/menu";
import renderError from "@/utils/RenderError";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

function Edit({ menu }: { menu: Menu }) {
    const { data, setData, post, errors, processing } = useForm<Menu>({
        id: menu.id,
        name: menu.name,
        slug: menu.slug,
        created_at: menu.created_at,
        updated_at: menu.updated_at,
        _method: "PUT",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("menus.update", menu.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Menyu muvaffaqiyatli o'zgartirildi!");
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
                    {`Menyuni o'zgartirish - ${menu.name}`}
                </h2>
            }
        >
            <Head title={`Menyuni o'zgartirish - ${menu.name}`} />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-5">
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
