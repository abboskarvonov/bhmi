const renderError = (errors: Record<string, string>, field: string) => {
    return errors[field] ? (
        <span className="text-red-600">{errors[field]}</span>
    ) : null;
};

export default renderError;
