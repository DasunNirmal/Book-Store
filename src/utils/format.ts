// Prices are stored as numbers everywhere. Only format them when displaying.

export const toNumber = (value: string | number | null | undefined): number => {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    if (!value) return 0;
    const parsed = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    return Number.isNaN(parsed) ? 0 : parsed;
};

export const formatPrice = (value: string | number | null | undefined): string =>
    `$${toNumber(value).toFixed(2)}`;

export const roundMoney = (value: number): number => Math.round(value * 100) / 100;

export const formatDate = (iso?: string): string => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
