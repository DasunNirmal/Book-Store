// src/hooks/useData.ts
// React hooks for real-time data updates

import { useState, useEffect } from 'react';
import dataService, { Book, User, Order } from '../services/DataServices.ts';

// Hook for books with real-time updates
export function useBooks() {
    const [books, setBooks] = useState<Book[]>(() => dataService.getBooks());

    useEffect(() => {
        const handleUpdate = (event: CustomEvent) => {
            setBooks(event.detail);
        };

        window.addEventListener('booksUpdated', handleUpdate as EventListener);
        return () => {
            window.removeEventListener('booksUpdated', handleUpdate as EventListener);
        };
    }, []);

    return {
        books,
        addBook: (book: Omit<Book, 'id'>) => dataService.addBook(book),
        updateBook: (id: string, updates: Partial<Book>) => dataService.updateBook(id, updates),
        deleteBook: (id: string) => dataService.deleteBook(id),
        getBookById: (id: string) => dataService.getBookById(id),
        searchBooks: (query: string) => dataService.searchBooks(query),
    };
}

// Hook for users with real-time updates
export function useUsers() {
    const [users, setUsers] = useState<User[]>(() => dataService.getUsers());

    useEffect(() => {
        const handleUpdate = (event: CustomEvent) => {
            setUsers(event.detail);
        };

        window.addEventListener('usersUpdated', handleUpdate as EventListener);
        return () => {
            window.removeEventListener('usersUpdated', handleUpdate as EventListener);
        };
    }, []);

    return {
        users,
        addUser: (user: Omit<User, 'id' | 'joinedDate'>) => dataService.addUser(user),
        updateUser: (id: string, updates: Partial<User>) => dataService.updateUser(id, updates),
        deleteUser: (id: string) => dataService.deleteUser(id),
        getUserById: (id: string) => dataService.getUserById(id),
    };
}

// Hook for orders with real-time updates
export function useOrders() {
    const [orders, setOrders] = useState<Order[]>(() => dataService.getOrders());

    useEffect(() => {
        const handleUpdate = (event: CustomEvent) => {
            setOrders(event.detail);
        };

        window.addEventListener('ordersUpdated', handleUpdate as EventListener);
        return () => {
            window.removeEventListener('ordersUpdated', handleUpdate as EventListener);
        };
    }, []);

    return {
        orders,
        createOrder: (orderData: {
            userId: string;
            userName: string;
            userEmail: string;
            items: { bookId: string; bookTitle: string; quantity: number; price: number }[];
            shippingAddress: string;
        }) => dataService.createOrder(orderData),
        updateOrderStatus: (id: string, status: Order['status']) =>
            dataService.updateOrderStatus(id, status),
        deleteOrder: (id: string) => dataService.deleteOrder(id),
        getOrderById: (id: string) => dataService.getOrderById(id),
        getOrdersByUserId: (userId: string) => dataService.getOrdersByUserId(userId),
    };
}

// Hook for statistics
export function useStatistics() {
    const [stats, setStats] = useState(() => dataService.getStatistics());

    useEffect(() => {
        const updateStats = () => {
            setStats(dataService.getStatistics());
        };

        // Update stats when any data changes
        window.addEventListener('booksUpdated', updateStats);
        window.addEventListener('usersUpdated', updateStats);
        window.addEventListener('ordersUpdated', updateStats);

        return () => {
            window.removeEventListener('booksUpdated', updateStats);
            window.removeEventListener('usersUpdated', updateStats);
            window.removeEventListener('ordersUpdated', updateStats);
        };
    }, []);

    return stats;
}