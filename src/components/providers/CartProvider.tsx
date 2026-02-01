import { createContext, useContext, useEffect, useState } from "react";
import {Book} from "./BookMarkProvider.tsx";
import dataService from "../../services/DataServices.ts";

interface CartItem extends Book {
    id?: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (book: Book & { id?: string }) => void;
    removeFromCart: (title: string) => void;
    updateQuantity: (title: string, quantity: number) => void;
    isCheckoutOpen: boolean;
    openCheckout: () => void;
    closeCheckout: () => void;
    buyNow: (book: Book & { id?: string }) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    isCheckoutOpen: false,
    openCheckout: () => {},
    closeCheckout: () => {},
    buyNow: () => {},
    clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const openCheckout = () => setIsCheckoutOpen(true);
    const closeCheckout = () => setIsCheckoutOpen(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (book: Book & { id?: string }) => {
        // If book has an ID, check stock in DataService
        if (book.id) {
            const bookInStock = dataService.getBookById(book.id);
            if (!bookInStock || bookInStock.stock < 1) {
                alert('Sorry, this book is out of stock!');
                return;
            }

            // Check if adding one more would exceed stock
            const existing = cartItems.find(item => item.title === book.title);
            const currentQuantity = existing ? existing.quantity : 0;

            if (currentQuantity >= bookInStock.stock) {
                alert(`Sorry, only ${bookInStock.stock} copies available!`);
                return;
            }
        }
        setCartItems(prev => {
            const existing = prev.find(item => item.title === book.title);
            if (existing) {
                return prev.map(item =>
                    item.title === book.title
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...book, quantity: 1 }];
        });
    };

    const removeFromCart = (title: string) => {
        setCartItems(prev => prev.filter(item => item.title !== title));
    };

    const updateQuantity = (title: string, quantity: number) => {
        if (quantity < 1) return;
        // Find the item to check stock
        const item = cartItems.find(i => i.title === title);
        if (item?.id) {
            const bookInStock = dataService.getBookById(item.id);
            if (bookInStock && quantity > bookInStock.stock) {
                alert(`Sorry, only ${bookInStock.stock} copies available!`);
                return;
            }
        }
        setCartItems(prev =>
            prev.map(item =>
                item.title === title ? { ...item, quantity } : item
            )
        );
    };

    const buyNow = (book: Book) => {
        addToCart(book); // Add the book to cart
        openCheckout();  // Open checkout
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            isCheckoutOpen,
            openCheckout,
            closeCheckout,
            buyNow,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);