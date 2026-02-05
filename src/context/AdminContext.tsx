import { createContext, useContext, useState, useEffect } from "react";
import dataService, {Book, Order, User} from "../services/DataServices";

/*export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
    createdAt?: string;
}*/

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
    // Use DataService instead of separate localStorage
    const [books, setBooks] = useState<Book[]>(() => dataService.getBooks());
    const [users, setUsers] = useState<User[]>(() => {
        const existingUsers = dataService.getUsers();
        // Add default admin if no users exist
        if (existingUsers.length === 0) {
            const adminUser = {
                name: 'Admin User',
                email: 'admin@bookhaven.com',
                role: 'admin' as const,
                phone: '',
                address: ''
            };
            return [dataService.addUser(adminUser)];
        }
        return existingUsers;
    });
    const [orders, setOrders] = useState<Order[]>(() => dataService.getOrders());

    // Listen for real-time updates from DataService
    useEffect(() => {
        const handleBooksUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            setBooks(customEvent.detail);
        };
        const handleUsersUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            setUsers(customEvent.detail);
        };
        const handleOrdersUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            setOrders(customEvent.detail);
        };

        window.addEventListener('booksUpdated', handleBooksUpdate);
        window.addEventListener('usersUpdated', handleUsersUpdate);
        window.addEventListener('ordersUpdated', handleOrdersUpdate);

        return () => {
            window.removeEventListener('booksUpdated', handleBooksUpdate);
            window.removeEventListener('usersUpdated', handleUsersUpdate);
            window.removeEventListener('ordersUpdated', handleOrdersUpdate);
        };
    }, []);

    const addBook = (bookData: Omit<Book, 'id' | 'createdAt'>) => {
        dataService.addBook(bookData);
        // State will be updated via the event listener
    };

    const updateBook = (id: string, bookData: Partial<Book>) => {
        dataService.updateBook(id, bookData);
        // State will be updated via the event listener
    };

    const deleteBook = (id: string) => {
        dataService.deleteBook(id);
        // State will be updated via the event listener
    };

    const updateUser = (id: string, userData: Partial<User>) => {
        dataService.updateUser(id, userData);
        // State will be updated via the event listener
    };

    const deleteUser = (id: string) => {
        dataService.deleteUser(id);
        // State will be updated via the event listener
    };

    const updateOrder = (id: string, orderData: Partial<Order>) => {
        if (orderData.status) {
            dataService.updateOrderStatus(id, orderData.status);
        }
        // State will be updated via the event listener
    };

    const deleteOrder = (id: string) => {
        dataService.deleteOrder(id);
        // State will be updated via the event listener
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