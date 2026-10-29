import {
    Field,
    FormActions,
    FormHeader,
    FormSection,
    FormShell,
} from "@/Components/Custom/Form";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu } from "@/types/menu";
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
        <AuthenticatedLayout header={<h2>Menyular</h2>}>
            <Head title={`Menyuni o'zgartirish - ${menu.name}`} />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Menyuni tahrirlash"
                    description={menu.name}
                    backHref={route("menus.index")}
                />

                <div className="max-w-2xl">
                    <FormSection title="Menyu ma'lumotlari">
                        <Field
                            label="Nomi"
                            htmlFor="name"
                            required
                            error={errors.name}
                        >
                            <Input
                                id="name"
                                value={data.name}
                                placeholder="Masalan: Jurnal haqida"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Slug"
                            htmlFor="slug"
                            required
                            hint="URL qismi: kichik lotin harflari va tire, masalan jurnal-haqida"
                            error={errors.slug}
                        >
                            <Input
                                id="slug"
                                value={data.slug}
                                placeholder="jurnal-haqida"
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                            />
                        </Field>
                    </FormSection>
                </div>

                <FormActions
                    cancelHref={route("menus.index")}
                    processing={processing}
                    submitLabel="O'zgarishlarni saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Edit;
