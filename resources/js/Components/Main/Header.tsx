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
        <div className="w-full bg-gray-100 py-4">
            <div className="container flex items-center justify-between">
                <Link
                    href="/"
                    className="flex max-w-80 items-center gap-3 text-lg font-bold"
                >
                    <img
                        src="/img/logo_min.webp"
                        className="w-16"
                        alt="BHMI Logo"
                    />
                    Journal of Accounting and Financial Economics
                </Link>
                <div className="flex items-center gap-6 text-sm font-semibold">
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
                                    <Button size={"icon"} variant={"outline"}>
                                        <FaUser />
                                    </Button>
                                </Link>
                                <Button
                                    size={"icon"}
                                    variant={"outline"}
                                    onClick={handleLogout}
                                >
                                    <FiLogOut />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href={route("login")}>
                                    <Button size={"icon"} variant={"outline"}>
                                        <FiLogIn />
                                    </Button>
                                </Link>
                                <Link href={route("register")}>
                                    <Button size={"icon"} variant={"outline"}>
                                        <FaUserPlus />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <Mobile />
                </div>
            </div>
        </div>
    );
}

export default Header;
