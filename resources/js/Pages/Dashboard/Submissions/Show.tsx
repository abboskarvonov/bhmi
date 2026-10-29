import { DetailItem, DetailList, FileCard } from "@/Components/Custom/Detail";
import { Field, FormHeader, FormSection } from "@/Components/Custom/Form";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Head, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { FormEvent } from "react";
import { IconType } from "react-icons";
import {
    FiCheckCircle,
    FiClock,
    FiMessageSquare,
    FiXCircle,
} from "react-icons/fi";

type Status = "pending" | "accepted" | "rejected";

interface Submission {
    id: number;
    name: string;
    file_url: string | null;
    comment: string | null;
    admin_note: string | null;
    status: Status;
    created_at: string;
    user: { id: number; name: string; email: string };
}

interface Props {
    submission: Submission;
}

const statusConfig: Record<
    Status,
    { label: string; icon: IconType; badge: string; active: string }
> = {
    pending: {
        label: "Ko'rib chiqilmoqda",
        icon: FiClock,
        badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
        active: "border-amber-400 bg-amber-50 text-amber-800 ring-2 ring-amber-400/30",
    },
    accepted: {
        label: "Qabul qilindi",
        icon: FiCheckCircle,
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        active: "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/30",
    },
    rejected: {
        label: "Rad etildi",
        icon: FiXCircle,
        badge: "bg-red-50 text-red-700 ring-red-600/20",
        active: "border-red-400 bg-red-50 text-red-800 ring-2 ring-red-400/30",
    },
};

function StatusBadge({ status }: { status: Status }) {
    const config = statusConfig[status];
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                config.badge,
            )}
        >
            <config.icon className="h-3 w-3" />
            {config.label}
        </span>
    );
}

function Show({ submission }: Props) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        status: submission.status,
        admin_note: submission.admin_note ?? "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route("submissions.admin.update", submission.id));
    };

    return (
        <AuthenticatedLayout header={<h2>Arizalar</h2>}>
            <Head title={`Ariza #${submission.id}`} />

            <div className="space-y-6">
                <FormHeader
                    title={submission.name}
                    description={
                        <span className="flex flex-wrap items-center gap-2">
                            Ariza #{submission.id}
                            <StatusBadge status={submission.status} />
                        </span>
                    }
                    backHref={route("submissions.admin.index")}
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="space-y-6 xl:col-span-2">
                        <FormSection title="Ariza ma'lumotlari">
                            <DetailList>
                                <DetailItem label="Muallif">
                                    {submission.user.name}
                                    <span className="block text-xs font-normal text-gray-500">
                                        {submission.user.email}
                                    </span>
                                </DetailItem>
                                <DetailItem label="Yuborilgan">
                                    {format(
                                        new Date(submission.created_at),
                                        "dd.MM.yyyy, HH:mm",
                                    )}
                                </DetailItem>
                                <DetailItem label="Holat">
                                    <StatusBadge status={submission.status} />
                                </DetailItem>
                            </DetailList>

                            <div>
                                <p className="mb-2 flex items-center gap-1.5 text-sm text-gray-500">
                                    <FiMessageSquare className="h-4 w-4" />
                                    Muallif izohi
                                </p>
                                <div className="whitespace-pre-line rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                                    {submission.comment || (
                                        <span className="text-gray-400">
                                            Izoh qoldirilmagan
                                        </span>
                                    )}
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Maqola fayli">
                            <FileCard
                                href={
                                    submission.file_url
                                        ? route(
                                              "submissions.download",
                                              submission.id,
                                          )
                                        : null
                                }
                                name={submission.file_url?.split("/").pop()}
                                meta="Faqat adminlar va muallif ko'ra oladi"
                            />
                        </FormSection>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <FormSection
                            title="Qaror"
                            description="Holat va izoh muallifga ko'rinadi."
                        >
                            <Field label="Holat" error={errors.status}>
                                <div className="grid gap-2">
                                    {(
                                        Object.keys(statusConfig) as Status[]
                                    ).map((key) => {
                                        const config = statusConfig[key];
                                        const active = data.status === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() =>
                                                    setData("status", key)
                                                }
                                                aria-pressed={active}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                                                    active
                                                        ? config.active
                                                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50",
                                                )}
                                            >
                                                <config.icon className="h-4 w-4 shrink-0" />
                                                {config.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </Field>

                            <Field
                                label="Admin izohi"
                                htmlFor="admin_note"
                                hint="Masalan: rad etish sababi yoki tuzatish talablari."
                                error={errors.admin_note}
                            >
                                <Textarea
                                    id="admin_note"
                                    value={data.admin_note}
                                    onChange={(e) =>
                                        setData("admin_note", e.target.value)
                                    }
                                    placeholder="Maqola bo'yicha izoh..."
                                    rows={5}
                                    className="resize-none rounded-lg"
                                />
                            </Field>

                            <Button
                                type="submit"
                                disabled={processing || !isDirty}
                                className="w-full rounded-xl"
                            >
                                {processing
                                    ? "Saqlanmoqda..."
                                    : "Qarorni saqlash"}
                            </Button>
                        </FormSection>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;
