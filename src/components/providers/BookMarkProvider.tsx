import {createContext, useContext, useEffect, useState} from "react";
import {useToast} from "../../context/ToastContext.tsx";
import {toNumber} from "../../utils/format.ts";

export interface Book {
    id?: string;
    title: string;
    author: string;
    price: number;
    image: string;
    description?: string;
}

interface BookmarkContextType {
    bookmarks: Book[];
    addBookmark: (book: Book) => void;
    removeBookmark: (title: string) => void;
    toggleBookmark: (book: Book) => void;
    isBookmarked: (title: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType>({
    bookmarks: [],
    addBookmark: () => {},
    removeBookmark: () => {},
    toggleBookmark: () => {},
    isBookmarked: () => false,
});

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {

    const { showToast } = useToast();

    const [bookmarks, setBookmarks] = useState<Book[]>(() => {
        const saved = localStorage.getItem("bookmarks");
        if (!saved) return [];
        // Older versions stored prices as strings like "$12.99"
        return (JSON.parse(saved) as Book[]).map(book => ({ ...book, price: toNumber(book.price) }));
    });

    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const isBookmarked = (title: string) => {
        return bookmarks.some((book) => book.title === title);
    };

    const addBookmark = (book: Book) => {
        if (isBookmarked(book.title)) return;
        setBookmarks((prev) => [...prev, { ...book, price: toNumber(book.price) }]);
        showToast(`“${book.title}” saved to your bookmarks`, 'bookmark');
    };

    const removeBookmark = (title: string) => {
        setBookmarks((prev) => prev.filter((book) => book.title !== title));
        showToast(`“${title}” removed from your bookmarks`, 'bookmark');
    };

    const toggleBookmark = (book: Book) => {
        if (isBookmarked(book.title)) {
            removeBookmark(book.title);
        } else {
            addBookmark(book);
        }
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, toggleBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmark = () => useContext(BookmarkContext);
