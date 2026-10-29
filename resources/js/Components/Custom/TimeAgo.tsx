import { format, formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";

interface Props {
    createdAt?: string; // Masalan, '2024-06-17T10:00:00Z'
    updatedAt?: string;
}

// Aniq sana va vaqt: "29.10.2026, 14:41"; "2 kun oldin" sichqoncha ustiga kelganda ko'rinadi
function TimeAgo({ createdAt, updatedAt }: Props) {
    const value = createdAt ?? updatedAt;
    if (!value) return null;

    const date = new Date(value);

    return (
        <time
            dateTime={value}
            title={formatDistanceToNow(date, { addSuffix: true, locale: uz })}
            className="whitespace-nowrap tabular-nums"
        >
            {format(date, "dd.MM.yyyy, HH:mm")}
        </time>
    );
}

export default TimeAgo;
