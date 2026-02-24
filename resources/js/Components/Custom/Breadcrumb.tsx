import { Link } from "@inertiajs/react";
import { FaChevronRight } from "react-icons/fa6";

function Breadcrumb({ title }: { title: string }) {
    return (
        <div className="border-b border-b-gray-500">
            <div className="container space-y-3 py-10">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <div className="flex items-center text-sm">
                    <Link
                        href={route("home")}
                        className=" text-gray-600 hover:text-gray-900"
                    >
                        Bosh sahifa
                    </Link>
                    <span className="mx-2 text-xs text-gray-500">
                        <FaChevronRight />
                    </span>
                    <span className="font-semibold">{title}</span>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;
