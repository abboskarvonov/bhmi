import Breadcrumb from "@/Components/Custom/Breadcrumb";
import MainLayout from "@/Layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent, useRef } from "react";
import { FaCloudUploadAlt, FaFilePdf, FaPaperPlane } from "react-icons/fa";

function Create() {
    const fileRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        file_url: File | null;
        comment: string;
    }>({
        name: "",
        file_url: null,
        comment: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("submissions.store"), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout
            title="Maqola yuborish"
            description="BHMI jurnalida chop etish uchun maqolangizni yuboring."
        >
            <Breadcrumb title="Maqola yuborish" />

            <div className="container mx-auto max-w-3xl px-6 py-16 lg:px-4">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Card top accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-teal-600" />

                    <div className="p-8">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                            <h1 className="text-2xl font-bold text-gray-900">
                                Maqola yuborish
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                    Maqola nomi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="Maqola sarlavhasini kiriting"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                                )}
                            </div>

                            {/* File */}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                    Maqola fayli (PDF, DOC, DOCX) <span className="text-red-500">*</span>
                                </label>
                                <div
                                    onClick={() => fileRef.current?.click()}
                                    className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50"
                                >
                                    {data.file_url ? (
                                        <>
                                            <FaFilePdf className="h-10 w-10 text-emerald-600" />
                                            <p className="text-sm font-medium text-emerald-700">
                                                {data.file_url.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {(data.file_url.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt className="h-10 w-10 text-gray-300" />
                                            <p className="text-sm text-gray-500">
                                                Fayl yuklash uchun bosing
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                PDF, DOC, DOCX — maksimum 10 MB
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) =>
                                        setData("file_url", e.target.files?.[0] ?? null)
                                    }
                                />
                                {errors.file_url && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.file_url}</p>
                                )}
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                    Izoh (ixtiyoriy)
                                </label>
                                <textarea
                                    value={data.comment}
                                    onChange={(e) => setData("comment", e.target.value)}
                                    placeholder="Maqola haqida qo'shimcha ma'lumot yoki izoh..."
                                    rows={4}
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                {errors.comment && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.comment}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <div className="flex items-center gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <FaPaperPlane className="h-4 w-4" />
                                    {processing ? "Yuborilmoqda..." : "Yuborish"}
                                </button>
                                <a
                                    href={route("submissions.index")}
                                    className="text-sm text-gray-400 transition-colors hover:text-gray-600"
                                >
                                    Mening maqolalarim
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Create;
