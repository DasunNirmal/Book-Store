import { createContext, useContext, useEffect, useState } from "react";
import {Book} from "./BookMarkProvider.tsx";

interface CartItem extends Book {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (book: Book) => void;
    removeFromCart: (title: string) => void;
    updateQuantity: (title: string, quantity: number) => void;
    isCheckoutOpen: boolean;
    openCheckout: () => void;
    closeCheckout: () => void;
    buyNow: (book: Book) => void;
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

    const addToCart = (book: Book) => {
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

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            isCheckoutOpen,
            openCheckout,
            closeCheckout,
            buyNow
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);