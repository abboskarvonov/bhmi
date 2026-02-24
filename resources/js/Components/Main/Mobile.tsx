import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { IoMenu } from "react-icons/io5";

function Mobile() {
    return (
        <div className="block lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={"icon"} variant={"outline"}>
                        <IoMenu size={30} />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>BHMIJ</SheetTitle>
                        <div className="mt-5 grid items-center gap-6 border-t-2 border-t-gray-600 pt-5">
                            <Link href={route("home")}>Jurnal haqida</Link>
                            <Link href={route("members")}>
                                Tahririyat a'zolari
                            </Link>
                            <Link href={route("requirements")}>
                                Maqola talablari
                            </Link>
                            <Link href={route("statue")}>
                                Tahririyat nizomi
                            </Link>
                            <Link href={route("article")}>Maqolalar</Link>
                            <Link href={route("archive")}>Arxiv</Link>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Mobile;
