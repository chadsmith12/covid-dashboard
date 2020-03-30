export function setValue(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function getValue(key: string): string | null {
    return window.localStorage.getItem(key);
}

export function getValueAsBoolean(key: string): boolean {
    const item = getValue(key);

    if (!item) {
        return false;
    }

    return item === "true";
}