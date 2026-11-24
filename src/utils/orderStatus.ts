import type { Order } from "../services/DataServices.ts";

export type OrderStatus = Order['status'];

// The steps a normal order moves through (cancelled is handled separately)
export const ORDER_STEPS: { status: OrderStatus; label: string; description: string }[] = [
    {
        status: 'pending',
        label: 'Order placed',
        description: "We've received your order and will start preparing it soon."
    },
    {
        status: 'processing',
        label: 'Processing',
        description: 'Your books are being packed.'
    },
    {
        status: 'shipped',
        label: 'Shipped',
        description: 'Your order is on its way.'
    },
    {
        status: 'delivered',
        label: 'Delivered',
        description: 'Your order has arrived. Enjoy your reading!'
    }
];

export const statusLabel = (status: OrderStatus): string =>
    status.charAt(0).toUpperCase() + status.slice(1);

export const statusBadgeClass = (status: string): string => {
    switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'processing': return 'bg-blue-100 text-blue-800';
        case 'shipped': return 'bg-purple-100 text-purple-800';
        case 'delivered': return 'bg-green-100 text-green-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};
