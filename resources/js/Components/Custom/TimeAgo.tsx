import { formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";

interface Props {
    createdAt?: string; // Masalan, '2024-06-17T10:00:00Z'
    updatedAt?: string;
}

// "2 kun oldin" ko'rinishida; to'liq sana sichqoncha ustiga kelganda ko'rinadi
function TimeAgo({ createdAt, updatedAt }: Props) {
    const value = createdAt ?? updatedAt;
    if (!value) return null;

    const date = new Date(value);

    return (
        <time dateTime={value} title={date.toLocaleString("uz-UZ")}>
            {formatDistanceToNow(date, { addSuffix: true, locale: uz })}
        </time>
    );
}

export default TimeAgo;
