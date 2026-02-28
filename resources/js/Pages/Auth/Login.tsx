import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen">
            <Head title="Kirish" />

            {/* Left — branding */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 p-12 lg:flex lg:w-1/2">
                {/* Decorative blurs */}
                <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-600/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
                {/* Dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                {/* Logo */}
                <Link href={route('home')} className="relative flex items-center gap-3">
                    <div className="rounded-xl bg-white p-1.5">
                        <img src="/img/logo_min.webp" className="w-10" alt="BHMI" width={40} height={40} />
                    </div>
                    <div>
                        <p className="font-bold text-white">Journal of Accounting</p>
                        <p className="text-sm text-emerald-200">and Financial Economics</p>
                    </div>
                </Link>

                {/* Center text */}
                <div className="relative space-y-4">
                    <div className="h-1 w-16 rounded-full bg-gradient-to-r from-emerald-300 to-teal-200" />
                    <h2 className="text-3xl font-extrabold text-white">
                        Xush kelibsiz!
                    </h2>
                    <p className="max-w-xs text-emerald-200/80">
                        Tizimga kirib maqolalaringizni yuboring va ularning holatini kuzating.
                    </p>
                </div>

                {/* Bottom quote */}
                <p className="relative text-xs text-emerald-300/60">
                    © {new Date().getFullYear()} BHMI — Buxlateriya hisobi va moliyaviy iqtisod jurnali
                </p>
            </div>

            {/* Right — form */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
                {/* Mobile logo */}
                <Link href={route('home')} className="mb-8 flex items-center gap-2 lg:hidden">
                    <div className="rounded-xl bg-emerald-700 p-1.5">
                        <img src="/img/logo_min.webp" className="w-8" alt="BHMI" width={32} height={32} />
                    </div>
                    <span className="font-bold text-gray-800">BHMI</span>
                </Link>

                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-2xl font-extrabold text-gray-900">Tizimga kirish</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Hisobingiz yo'qmi?{' '}
                            <Link href={route('register')} className="font-semibold text-emerald-700 hover:text-emerald-900">
                                Ro'yxatdan o'ting
                            </Link>
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">
                                Email manzil
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    autoFocus
                                    placeholder="example@mail.com"
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                    Parol
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs text-emerald-700 hover:text-emerald-900">
                                        Parolni unutdingizmi?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
                        </div>

                        {/* Remember me */}
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-600">Meni eslab qol</span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Kirilmoqda...' : 'Kirish'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Hali hisobingiz yo'qmi?{' '}
                        <Link href={route('register')} className="font-semibold text-emerald-700 hover:text-emerald-900">
                            Ro'yxatdan o'ting →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
