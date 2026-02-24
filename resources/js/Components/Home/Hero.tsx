import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";
import { FaArrowRight, FaEnvelope } from "react-icons/fa6";
import { Journal } from "@/types/journal";
import { FaPhoneAlt } from "react-icons/fa";

function Hero({ latest_journal }: { latest_journal: Journal }) {
    return (
        <section className="border-b-2 border-gray-600 bg-white px-2 py-10 md:px-0">
            <div className="container mx-auto max-w-6xl items-center px-8 xl:px-5">
                <div className="flex flex-wrap items-center sm:-mx-3">
                    <div className="w-full md:w-3/5 md:px-3 lg:w-2/3">
                        <div className="w-full space-y-2 pb-6 sm:max-w-md sm:pr-5 md:space-y-3 md:pb-0 lg:max-w-lg lg:space-y-5 lg:pr-0">
                            <img
                                src="/img/logo.webp"
                                className="w-40"
                                alt="BHMI jurnal logotipi"
                                width={160}
                                height={60}
                                loading="eager"
                            />
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-3xl">
                                <span className="block xl:inline">
                                    Journal of Accounting and Financial
                                    Economics
                                </span>
                            </h1>
                            <p className="mx-auto flex items-center gap-2 text-gray-500 sm:max-w-md md:max-w-3xl lg:text-xl">
                                <FaPhoneAlt aria-hidden="true" />
                                <a href="tel:+998937279555">
                                    +998 93 727 95 55
                                </a>
                            </p>
                            <p className="mx-auto flex items-center gap-2 text-gray-500 sm:max-w-md md:max-w-3xl lg:text-xl">
                                <FaEnvelope aria-hidden="true" />
                                <a href="mailto:buxglateriyahisobi@gmail.com">
                                    buxglateriyahisobi@gmail.com
                                </a>
                            </p>
                            <div className="relative flex flex-col gap-4 sm:flex-row sm:space-x-4">
                                {latest_journal && (
                                    <Link
                                        href={`/archive/${latest_journal.slug}`}
                                    >
                                        <Button size={"lg"}>
                                            Oxirgi son <FaArrowRight aria-hidden="true" />
                                        </Button>
                                    </Link>
                                )}
                                <Link href="/article">
                                    <Button size={"lg"} variant={"secondary"}>
                                        Maqolalar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/5 lg:w-2/6">
                        <div className="h-auto w-full overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                            {/* LCP elementi — fetchpriority="high", lazy loading o'chirilgan */}
                            <img
                                src="/img/page.webp"
                                className="h-[530px] w-full object-cover"
                                alt="BHMI jurnal sahifasi"
                                width={480}
                                height={530}
                                fetchPriority="high"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
