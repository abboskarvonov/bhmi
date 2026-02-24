import { Link, useForm, usePage } from "@inertiajs/react";
import { FaUser, FaUserPlus } from "react-icons/fa6";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Button } from "../ui/button";
import Mobile from "./Mobile";

function Header() {
    const { post } = useForm();
    const user = usePage().props.auth.user;

    const handleLogout = () => {
        post(route("logout"));
    };

    return (
        <header className="w-full bg-gray-100 py-4">
            <div className="container flex items-center justify-between">
                <Link
                    href="/"
                    className="flex max-w-80 items-center gap-3 text-lg font-bold"
                    aria-label="BHMI bosh sahifaga o'tish"
                >
                    <img
                        src="/img/logo_min.webp"
                        className="w-16"
                        alt="BHMI logotipi"
                        width={64}
                        height={64}
                        loading="eager"
                    />
                    Journal of Accounting and Financial Economics
                </Link>
                <nav
                    className="flex items-center gap-6 text-sm font-semibold"
                    aria-label="Asosiy navigatsiya"
                >
                    <div className="hidden items-center gap-6 lg:flex">
                        <Link href={route("home")}>Jurnal haqida</Link>
                        <Link href={route("members")}>Tahririyat a'zolari</Link>
                        <Link href={route("requirements")}>
                            Maqola talablari
                        </Link>
                        <Link href={route("statue")}>Tahririyat nizomi</Link>
                        <Link href={route("article")}>Maqolalar</Link>
                        <Link href={route("archive")}>Arxiv</Link>
                    </div>
                    <div className="flex items-center gap-2 border-l-2 border-l-gray-300 pl-6">
                        {user ? (
                            <>
                                <Link href={route("dashboard")}>
                                    <Button
                                        size={"icon"}
                                        variant={"outline"}
                                        aria-label="Boshqaruv paneli"
                                    >
                                        <FaUser aria-hidden="true" />
                                    </Button>
                                </Link>
                                <Button
                                    size={"icon"}
                                    variant={"outline"}
                                    onClick={handleLogout}
                                    aria-label="Chiqish"
                                >
                                    <FiLogOut aria-hidden="true" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href={route("login")}>
                                    <Button
                                        size={"icon"}
                                        variant={"outline"}
                                        aria-label="Kirish"
                                    >
                                        <FiLogIn aria-hidden="true" />
                                    </Button>
                                </Link>
                                <Link href={route("register")}>
                                    <Button
                                        size={"icon"}
                                        variant={"outline"}
                                        aria-label="Ro'yxatdan o'tish"
                                    >
                                        <FaUserPlus aria-hidden="true" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <Mobile />
                </nav>
            </div>
        </header>
    );
}

export default Header;
