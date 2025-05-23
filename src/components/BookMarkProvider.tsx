import {createContext, useContext, useEffect, useState} from "react";

interface Book {
    title: string;
    author: string;
    price: string | number;
    image: string;
    description?: string;
}

interface BookmarkContextType {
    bookmarks: Book[];
    addBookmark: (book: Book) => void;
    removeBookmark: (title: string) => void;
    isBookmarked: (title: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType>({
    bookmarks: [],
    addBookmark: () => {},
    removeBookmark: () => {},
    isBookmarked: () => false,
});

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {

    const [bookmarks, setBookmarks] = useState<Book[]>(() => {
        const saved = localStorage.getItem("bookmarks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (book: Book) => {
        setBookmarks((prev) =>
            prev.some(b => b.title === book.title) ? prev : [...prev, book]
        );
    };

    const removeBookmark = (title: string) => {
        setBookmarks((prev) => prev.filter((book) => book.title !== title));
    };

    const isBookmarked = (title: string) => {
        return bookmarks.some((book) => book.title === title);
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmark = () => useContext(BookmarkContext);