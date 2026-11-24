import { createContext, useContext, useEffect, useState } from "react";
import {Book} from "./BookMarkProvider.tsx";
import dataService from "../../services/DataServices.ts";
import {useToast} from "../../context/ToastContext.tsx";
import {toNumber} from "../../utils/format.ts";

export interface CartItem extends Book {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (book: Book, silent?: boolean) => boolean;
    removeFromCart: (title: string) => void;
    updateQuantity: (title: string, quantity: number) => void;
    isCheckoutOpen: boolean;
    openCheckout: () => void;
    closeCheckout: () => void;
    buyNow: (book: Book) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => false,
    removeFromCart: () => {},
    updateQuantity: () => {},
    isCheckoutOpen: false,
    openCheckout: () => {},
    closeCheckout: () => {},
    buyNow: () => {},
    clearCart: () => {},
});

// Find the book in the store, even if the cart item has no id (older saved carts)
const findStoredBook = (book: { id?: string; title: string }) =>
    book.id
        ? dataService.getBookById(book.id)
        : dataService.getBooks().find(b => b.title === book.title);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const { showToast } = useToast();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cart");
        if (!saved) return [];
        // Older versions stored prices as strings like "$12.99"
        return (JSON.parse(saved) as CartItem[]).map(item => ({ ...item, price: toNumber(item.price) }));
    });

    const openCheckout = () => setIsCheckoutOpen(true);
    const closeCheckout = () => setIsCheckoutOpen(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (book: Book, silent = false): boolean => {
        const stored = findStoredBook(book);

        if (!stored) {
            showToast('Sorry, this book is no longer available', 'error');
            return false;
        }
        if (stored.stock < 1) {
            showToast(`“${stored.title}” is out of stock`, 'error');
            return false;
        }

        const existing = cartItems.find(item => item.title === stored.title);
        const currentQuantity = existing ? existing.quantity : 0;
        if (currentQuantity >= stored.stock) {
            showToast(`Only ${stored.stock} ${stored.stock === 1 ? 'copy' : 'copies'} of “${stored.title}” available`, 'error');
            return false;
        }

        setCartItems(prev => {
            const found = prev.find(item => item.title === stored.title);
            if (found) {
                return prev.map(item =>
                    item.title === stored.title
                        ? { ...item, id: stored.id, price: stored.price, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: stored.id,
                title: stored.title,
                author: stored.author,
                price: stored.price,
                image: stored.image,
                description: stored.description,
                quantity: 1
            }];
        });

        if (!silent) showToast(`“${stored.title}” added to your cart`, 'cart');
        return true;
    };

    const removeFromCart = (title: string) => {
        setCartItems(prev => prev.filter(item => item.title !== title));
    };

    const updateQuantity = (title: string, quantity: number) => {
        if (quantity < 1) return;
        const item = cartItems.find(i => i.title === title);
        const stored = item ? findStoredBook(item) : undefined;
        if (stored && quantity > stored.stock) {
            showToast(`Only ${stored.stock} ${stored.stock === 1 ? 'copy' : 'copies'} of “${stored.title}” available`, 'error');
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.title === title ? { ...item, quantity } : item
            )
        );
    };

    const buyNow = (book: Book) => {
        const alreadyInCart = cartItems.some(item => item.title === book.title);
        // Open checkout if the book is already in the cart, or was just added
        if (alreadyInCart || addToCart(book, true)) {
            openCheckout();
        }
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
