import DOMPurify from "dompurify";

interface SafeHtmlProps {
    html?: string | null;
    className?: string;
    fallback?: string;
}

// Admin kiritgan HTML'ni tozalab chiqaradi; kontent yo'q bo'lsa sahifa yiqilmaydi
function SafeHtml({
    html,
    className,
    fallback = "Ma'lumot hali kiritilmagan.",
}: SafeHtmlProps) {
    if (!html) {
        return <p className="text-gray-500">{fallback}</p>;
    }

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        />
    );
}

export default SafeHtml;
