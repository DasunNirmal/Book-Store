import { createContext, useContext, useState, useEffect } from "react";

export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
}

export interface Order {
    id: string;
    userId: string;
    userName: string;
    books: { bookId: string; title: string; quantity: number; price: number }[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}

interface AdminContextType {
    books: Book[];
    users: User[];
    orders: Order[];
    addBook: (book: Omit<Book, 'id' | 'createdAt'>) => void;
    updateBook: (id: string, book: Partial<Book>) => void;
    deleteBook: (id: string) => void;
    updateUser: (id: string, user: Partial<User>) => void;
    deleteUser: (id: string) => void;
    updateOrder: (id: string, order: Partial<Order>) => void;
    deleteOrder: (id: string) => void;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [books, setBooks] = useState<Book[]>(() => {
        const saved = localStorage.getItem('admin-books');
        return saved ? JSON.parse(saved) : [];
    });

    const [users, setUsers] = useState<User[]>(() => {
        const saved = localStorage.getItem('admin-users');
        return saved ? JSON.parse(saved) : [
            {
                id: '1',
                name: 'Admin User',
                email: 'admin@bookhaven.com',
                role: 'admin' as const,
                createdAt: new Date().toISOString()
            }
        ];
    });

    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem('admin-orders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('admin-books', JSON.stringify(books));
    }, [books]);

    useEffect(() => {
        localStorage.setItem('admin-users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('admin-orders', JSON.stringify(orders));
    }, [orders]);

    const addBook = (bookData: Omit<Book, 'id' | 'createdAt'>) => {
        const newBook: Book = {
            ...bookData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        setBooks(prev => [...prev, newBook]);
    };

    const updateBook = (id: string, bookData: Partial<Book>) => {
        setBooks(prev => prev.map(book =>
            book.id === id ? { ...book, ...bookData } : book
        ));
    };

    const deleteBook = (id: string) => {
        setBooks(prev => prev.filter(book => book.id !== id));
    };

    const updateUser = (id: string, userData: Partial<User>) => {
        setUsers(prev => prev.map(user =>
            user.id === id ? { ...user, ...userData } : user
        ));
    };

    const deleteUser = (id: string) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    const updateOrder = (id: string, orderData: Partial<Order>) => {
        setOrders(prev => prev.map(order =>
            order.id === id ? { ...order, ...orderData } : order
        ));
    };

    const deleteOrder = (id: string) => {
        setOrders(prev => prev.filter(order => order.id !== id));
    };

    return (
        <AdminContext.Provider value={{
            books, users, orders,
            addBook, updateBook, deleteBook,
            updateUser, deleteUser,
            updateOrder, deleteOrder
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);