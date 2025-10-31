import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { BookForm } from "./BookForm";

export const BookManagement = () => {
    const { books, deleteBook } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<any>(null);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (book: any) => {
        setEditingBook(book);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingBook(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Book Management</h2>
                    <p className="text-stone-600">Manage your book collection</p>
                </div>

                <motion.button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add New Book
                </motion.button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-700 rounded-full bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredBooks.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
                        >
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${book.image}')` }} />

                            <div className="p-4">
                                <h3 className="font-bold text-lg text-slate-800 truncate">{book.title}</h3>
                                <p className="text-sm text-stone-600">by {book.author}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="font-bold text-rose-500">${book.price}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        book.stock > 10 ? 'bg-green-100 text-green-800' :
                                            book.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                    }`}>
                    {book.stock} in stock
                  </span>
                                </div>

                                <div className="flex justify-end space-x-2 mt-4">
                                    <motion.button
                                        onClick={() => handleEdit(book)}
                                        className="p-2 rounded-full border-2 border-slate-700 text-slate-700 hover:bg-slate-100"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </motion.button>

                                    <motion.button
                                        onClick={() => deleteBook(book.id)}
                                        className="p-2 rounded-full bg-rose-500 text-white hover:bg-rose-700"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">No books found</p>
                    <p className="text-gray-400">Add some books to get started</p>
                </div>
            )}

            {/* Book Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <BookForm
                        book={editingBook}
                        onClose={handleCloseForm}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};