import {
    Field,
    FormActions,
    FormHeader,
    FormSection,
    FormShell,
} from "@/Components/Custom/Form";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MenuCreateData } from "@/types/menu";
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
        <AuthenticatedLayout header={<h2>Menyular</h2>}>
            <Head title="Menyu yaratish" />

            <FormShell onSubmit={submit}>
                <FormHeader
                    title="Yangi menyu"
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
                    submitLabel="Menyuni saqlash"
                />
            </FormShell>
        </AuthenticatedLayout>
    );
}

export default Create;
