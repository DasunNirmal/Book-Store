// Centralized data management using localStorage

export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    joinedDate: string;
}

export interface OrderItem {
    bookId: string;
    bookTitle: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    shippingAddress: string;
}

// Keys for localStorage
const STORAGE_KEYS = {
    BOOKS: 'bookstore_books',
    USERS: 'bookstore_users',
    ORDERS: 'bookstore_orders',
    CURRENT_USER: 'bookstore_current_user',
};

// Initialize with sample data if empty
const INITIAL_BOOKS: Book[] = [
    {
        id: '1',
        title: 'Atomic Habits',
        author: 'James Clear',
        price: 11.49,
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Transform your life with tiny changes that lead to remarkable results.',
        category: 'Self-Help',
        stock: 45
    },
    {
        id: '2',
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'A gripping psychological thriller about a woman who refuses to speak.',
        category: 'Mystery',
        stock: 32
    },
    {
        id: '3',
        title: 'Educated',
        author: 'Tara Westover',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'A memoir about a woman who grows up in a survivalist family and eventually escapes.',
        category: 'Biography',
        stock: 28
    },
    {
        id: '4',
        title: 'The Midnight Library',
        author: 'Matt Haig',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Between life and death exists the Midnight Library.',
        category: 'Fiction',
        stock: 50
    },
    {
        id: '5',
        title: 'Dune',
        author: 'Frank Herbert',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'A stunning blend of adventure and mysticism, environmentalism and politics.',
        category: 'Science Fiction',
        stock: 22
    },
];

class DataService {
    // Initialize storage with sample data if empty
    initialize() {
        if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
            this.saveBooks(INITIAL_BOOKS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
        }
    }

    // ==================== BOOKS ====================
    getBooks(): Book[] {
        const data = localStorage.getItem(STORAGE_KEYS.BOOKS);
        return data ? JSON.parse(data) : [];
    }

    getBookById(id: string): Book | undefined {
        const books = this.getBooks();
        return books.find(book => book.id === id);
    }

    saveBooks(books: Book[]): void {
        localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
        // Trigger custom event for real-time updates
        window.dispatchEvent(new CustomEvent('booksUpdated', { detail: books }));
    }

    addBook(book: Omit<Book, 'id'>): Book {
        const books = this.getBooks();
        const newBook: Book = {
            ...book,
            id: Date.now().toString(),
        };
        books.push(newBook);
        this.saveBooks(books);
        return newBook;
    }

    updateBook(id: string, updates: Partial<Book>): Book | null {
        const books = this.getBooks();
        const index = books.findIndex(book => book.id === id);
        if (index === -1) return null;

        books[index] = { ...books[index], ...updates };
        this.saveBooks(books);
        return books[index];
    }

    deleteBook(id: string): boolean {
        const books = this.getBooks();
        const filtered = books.filter(book => book.id !== id);
        if (filtered.length === books.length) return false;

        this.saveBooks(filtered);
        return true;
    }

    updateBookStock(id: string, quantity: number): boolean {
        const book = this.getBookById(id);
        if (!book || book.stock < quantity) return false;

        return !!this.updateBook(id, { stock: book.stock - quantity });
    }

    // ==================== USERS ====================
    getUsers(): User[] {
        const data = localStorage.getItem(STORAGE_KEYS.USERS);
        return data ? JSON.parse(data) : [];
    }

    getUserById(id: string): User | undefined {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    saveUsers(users: User[]): void {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        window.dispatchEvent(new CustomEvent('usersUpdated', { detail: users }));
    }

    addUser(user: Omit<User, 'id' | 'joinedDate'>): User {
        const users = this.getUsers();
        const newUser: User = {
            ...user,
            id: Date.now().toString(),
            joinedDate: new Date().toISOString().split('T')[0],
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    updateUser(id: string, updates: Partial<User>): User | null {
        const users = this.getUsers();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...updates };
        this.saveUsers(users);
        return users[index];
    }

    deleteUser(id: string): boolean {
        const users = this.getUsers();
        const filtered = users.filter(user => user.id !== id);
        if (filtered.length === users.length) return false;

        this.saveUsers(filtered);
        return true;
    }

    // ==================== ORDERS ====================
    getOrders(): Order[] {
        const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return data ? JSON.parse(data) : [];
    }

    getOrderById(id: string): Order | undefined {
        const orders = this.getOrders();
        return orders.find(order => order.id === id);
    }

    getOrdersByUserId(userId: string): Order[] {
        const orders = this.getOrders();
        return orders.filter(order => order.userId === userId);
    }

    saveOrders(orders: Order[]): void {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        window.dispatchEvent(new CustomEvent('ordersUpdated', { detail: orders }));
    }

    createOrder(orderData: {
        userId: string;
        userName: string;
        userEmail: string;
        items: OrderItem[];
        shippingAddress: string;
    }): Order | null {
        // Validate stock availability
        for (const item of orderData.items) {
            const book = this.getBookById(item.bookId);
            if (!book || book.stock < item.quantity) {
                return null; // Not enough stock
            }
        }

        // Calculate total
        const total = orderData.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // Create order
        const orders = this.getOrders();
        const newOrder: Order = {
            id: Date.now().toString(),
            userId: orderData.userId,
            userName: orderData.userName,
            userEmail: orderData.userEmail,
            items: orderData.items,
            total,
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            shippingAddress: orderData.shippingAddress,
        };

        // Update stock for each item
        for (const item of orderData.items) {
            this.updateBookStock(item.bookId, item.quantity);
        }

        orders.push(newOrder);
        this.saveOrders(orders);
        return newOrder;
    }

    updateOrderStatus(
        id: string,
        status: Order['status']
    ): Order | null {
        const orders = this.getOrders();
        const index = orders.findIndex(order => order.id === id);
        if (index === -1) return null;

        orders[index].status = status;
        this.saveOrders(orders);
        return orders[index];
    }

    deleteOrder(id: string): boolean {
        const orders = this.getOrders();
        const filtered = orders.filter(order => order.id !== id);
        if (filtered.length === orders.length) return false;

        this.saveOrders(filtered);
        return true;
    }

    // ==================== STATISTICS ====================
    getStatistics() {
        const books = this.getBooks();
        const users = this.getUsers();
        const orders = this.getOrders();

        const totalRevenue = orders.reduce((sum, order) => {
            if (order.status !== 'cancelled') {
                return sum + order.total;
            }
            return sum;
        }, 0);

        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const lowStockBooks = books.filter(b => b.stock < 10).length;

        return {
            totalBooks: books.length,
            totalUsers: users.length,
            totalOrders: orders.length,
            totalRevenue,
            pendingOrders,
            lowStockBooks,
            recentOrders: orders.slice(-5).reverse(),
        };
    }

    // ==================== CURRENT USER ====================
    setCurrentUser(user: User | null): void {
        if (user) {
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        }
    }

    getCurrentUser(): User | null {
        const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return data ? JSON.parse(data) : null;
    }

    // ==================== SEARCH ====================
    searchBooks(query: string): Book[] {
        const books = this.getBooks();
        const lowerQuery = query.toLowerCase();
        return books.filter(
            book =>
                book.title.toLowerCase().includes(lowerQuery) ||
                book.author.toLowerCase().includes(lowerQuery) ||
                book.category.toLowerCase().includes(lowerQuery)
        );
    }

    getBooksByCategory(category: string): Book[] {
        const books = this.getBooks();
        return books.filter(book => book.category === category);
    }
}

// Create singleton instance
const dataService = new DataService();
dataService.initialize();

export default dataService;