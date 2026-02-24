import { Input } from "@/Components/ui/input";

interface SearchControlsProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

function SearchControls({ searchTerm, onSearchChange }: SearchControlsProps) {
    return (
        <div className="mb-4">
            <Input
                type="text"
                placeholder="Qidirish..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default SearchControls;
