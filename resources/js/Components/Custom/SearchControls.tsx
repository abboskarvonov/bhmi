import { Input } from "@/Components/ui/input";
import { ReactNode } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchControlsProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    children?: ReactNode;
}

function SearchControls({
    searchTerm,
    onSearchChange,
    children,
}: SearchControlsProps) {
    return (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    type="search"
                    placeholder="Qidirish..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-10 rounded-xl pl-9"
                />
            </div>
            {children}
        </div>
    );
}

export default SearchControls;
