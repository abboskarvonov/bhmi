import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen">
            <Head title="Ro'yxatdan o'tish" />

            {/* Left — branding */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 p-12 lg:flex lg:w-1/2">
                <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-600/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
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
                        Qo'shiling!
                    </h2>
                    <p className="max-w-xs text-emerald-200/80">
                        Ro'yxatdan o'tib ilmiy maqolalaringizni jurnal tahririyatiga yuboring.
                    </p>
                    {/* Feature list */}
                    <ul className="space-y-2 pt-2">
                        {[
                            'Maqola yuborish imkoniyati',
                            'Ariza holati kuzatish',
                            'Admin izohlari ko\'rish',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-emerald-100">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

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
                        <h1 className="text-2xl font-extrabold text-gray-900">Ro'yxatdan o'tish</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Hisobingiz bormi?{' '}
                            <Link href={route('login')} className="font-semibold text-emerald-700 hover:text-emerald-900">
                                Kirish
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                                Ism familiya
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    autoFocus
                                    placeholder="Ism va familiyangiz"
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                        </div>

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
                                    placeholder="example@mail.com"
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-gray-700">
                                Parol
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                    placeholder="Kamida 8 ta belgi"
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

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="password_confirmation" className="mb-1.5 block text-sm font-semibold text-gray-700">
                                Parolni tasdiqlang
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password_confirmation"
                                    type={showConfirm ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                    placeholder="Parolni qayta kiriting"
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Allaqachon ro'yxatdan o'tganmisiz?{' '}
                        <Link href={route('login')} className="font-semibold text-emerald-700 hover:text-emerald-900">
                            Kirish →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
