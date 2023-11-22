export function getDateLocal(value: string) {
    const date = new Date(value);
    return date.toLocaleDateString();
}
