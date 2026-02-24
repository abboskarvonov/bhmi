import { Link } from "@inertiajs/react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <section className="bg-gray-200">
            <div className="mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl gap-6">
                    <h2 className="text-xl font-semibold">
                        Bog'lanish uchun ma'lumotlar
                    </h2>
                    <p className="flex items-center gap-2">
                        <FaLocationDot size={22} /> Samarqand viloyati,
                        Samarqand shahri, Obod maskan mfy, Qorasuv mavzesi,
                        140-Uy, 53-xonadon.
                    </p>
                    <p className="flex items-center gap-2">
                        <FaPhone size={22} /> +998937279555
                    </p>
                    <p className="flex items-center gap-2">
                        <FaTelegramPlane size={22} />{" "}
                        <a
                            href="https://t.me/BHMIJ_UZ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-700"
                            aria-label="Telegram kanalimiz"
                        >
                            https://t.me/BHMIJ_UZ
                        </a>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaEnvelope size={22} /> buxglateriyahisobi@gmail.com
                    </p>
                    <p className="flex items-center gap-2">
                        <TbWorldWww size={22} /> www.bhmi.uz
                    </p>
                </div>
                <nav className="flex flex-wrap justify-center gap-6 border-b border-t border-gray-700 py-4">
                    <Link href={route("home")}>Jurnal haqida</Link>
                    <Link href={route("members")}>Tahririyat a'zolari</Link>
                    <Link href={route("requirements")}>Maqola talablari</Link>
                    <Link href={route("statue")}>Tahririyat nizomi</Link>
                    <Link href={route("article")}>Maqolalar</Link>
                    <Link href={route("archive")}>Arxiv</Link>
                </nav>
                <p className="mt-8 text-center text-base leading-6 text-gray-400">
                    &copy; 2025 - {currentYear}, Buxlateriya hisobi va moliyaviy
                    iqtisod jurnali. All rights reserved.
                </p>
            </div>
        </section>
    );
}

export default Footer;
