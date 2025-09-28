import React, { useState, useMemo, useCallback } from 'react';

// --- 1. TYPE DEFINITIONS (TypeScript Precision) ---

// Define the shape of a Book object
type Book = {
  id: string; // Using string for UUID
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  genre: string;
  isBorrowed: boolean;
};

// Define the shape for form data (omits 'id' and 'isBorrowed')
type BookFormData = Omit<Book, 'id' | 'isBorrowed'>;

// Define the props for the actions passed down
type LMSActions = {
  addBook: (book: BookFormData) => void;
  deleteBook: (id: string) => void;
  toggleBorrowStatus: (id: string) => void;
};

// --- 2. MOCK DATA (Initial State) ---
const mockBooks: Book[] = [
  {
    id: 'b1',
    title: 'Software Architecture Patterns',
    author: 'J. Smith',
    isbn: '9781234567890',
    publicationYear: 2022,
    genre: 'Technology',
    isBorrowed: false,
  },
  {
    id: 'b2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    publicationYear: 1925,
    genre: 'Classic Fiction',
    isBorrowed: true,
  },
  {
    id: 'b3',
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '9780441172719',
    publicationYear: 1965,
    genre: 'Science Fiction',
    isBorrowed: false,
  },
  {
    id: 'b4',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    publicationYear: 2018,
    genre: 'Self-Help',
    isBorrowed: true,
  },
];

// --- 3. STATE MANAGEMENT HOOK (Centralized Logic) ---
const useLMS = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState('');
  
  // High-performance filtering using useMemo
  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowerSearchTerm) ||
      book.author.toLowerCase().includes(lowerSearchTerm) ||
      book.isbn.includes(lowerSearchTerm)
    );
  }, [books, searchTerm]);

  const addBook = useCallback((newBook: BookFormData) => {
    const bookWithId: Book = { 
      ...newBook, 
      id: crypto.randomUUID(), 
      isBorrowed: false,
    };
    setBooks(prev => [bookWithId, ...prev]);
  }, []);

  const deleteBook = useCallback((id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  }, []);

  const toggleBorrowStatus = useCallback((id: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id
          ? { ...book, isBorrowed: !book.isBorrowed }
          : book
      )
    );
  }, []);

  return {
    filteredBooks,
    searchTerm,
    setSearchTerm,
    addBook,
    deleteBook,
    toggleBorrowStatus,
  };
};

// --- 4. INDIVIDUAL COMPONENTS (Modular Design) ---

// Custom Footer Component
const Footer: React.FC = () => {
  const githubUrl = 'https://github.com/Hussein-Salim'; 
  return (
    <footer className="bg-gray-900 shadow-2xl p-6 mt-12 border-t border-deep-mint">
      <div className="container mx-auto text-center text-sm text-gray-400">
        <p>
          Library Management System | All rights reserved &copy; {new Date().getFullYear()}
        </p>
        <p className="mt-2 text-deep-mint hover:text-spearmint transition duration-300">
          Built with ❤️ by{' '}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            Hussein Salim
          </a>
        </p>
      </div>
    </footer>
  );
};

// Header Component
const Header: React.FC = () => (
  <header className="bg-gray-800 p-6 shadow-xl sticky top-0 z-10 border-b border-spearmint">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* START OF KNOWLEDGE ICON LOGO */}
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-spearmint"
        >
          <rect width="40" height="40" fill="transparent"/>
          {/* Outer spiral/swirl representing knowledge - Deep Mint */}
          <path 
            d="M35 5C35 15 25 25 15 25C5 25 5 35 15 35" 
            stroke="#66CDAA" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          {/* Inner swirl/book pages - Spearmint (lighter) */}
          <path 
            d="M30 10C30 16 22 22 15 22C8 22 8 30 15 30" 
            stroke="#A1E3B3" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
        {/* END OF KNOWLEDGE ICON LOGO */}

        <h1 className="text-4xl font-extrabold text-deep-mint tracking-tight font-inter">
          LMS <span className="text-gray-300 text-xl font-light">| Catalog</span>
        </h1>
      </div>
    </div>
  </header>
);


// SearchBar Component
const SearchBar: React.FC<{ onSearch: (term: string) => void, onAddClick: () => void }> = ({ onSearch, onAddClick }) => {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search by title, author, or ISBN..."
        value={input}
        onChange={handleChange}
        className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-spearmint focus:ring-1 focus:ring-spearmint transition duration-300 shadow-md"
      />
      <button
        onClick={onAddClick}
        className="bg-spearmint hover:bg-deep-mint text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add New Book
      </button>
    </div>
  );
};


// BookCard Component
const BookCard: React.FC<{ book: Book; actions: LMSActions }> = ({ book, actions }) => {
  const statusClasses = book.isBorrowed
    ? 'bg-red-900 text-red-300 border-red-700'
    : 'bg-green-900 text-spearmint border-deep-mint';

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between border-l-4 border-spearmint">
      <div>
        <h3 className="text-xl font-bold text-white mb-2 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          By <span className="text-deep-mint font-semibold">{book.author}</span>
        </p>
        <div className="space-y-1 text-sm text-gray-400">
          <p>
            <span className="font-semibold text-gray-300">ISBN:</span> {book.isbn}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Year:</span> {book.publicationYear}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Genre:</span> {book.genre}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${statusClasses}`}>
          {book.isBorrowed ? 'Borrowed' : 'Available'}
        </span>

        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => actions.toggleBorrowStatus(book.id)}
            className={`flex-1 text-sm py-2 px-3 rounded-lg transition duration-300 font-medium ${
              book.isBorrowed
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-deep-mint hover:bg-spearmint text-gray-900'
            }`}
          >
            {book.isBorrowed ? 'Mark as Returned' : 'Mark as Borrowed'}
          </button>
          <button
            onClick={() => actions.deleteBook(book.id)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-red-800 transition duration-300 text-gray-300"
            title="Delete Book"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 6h6v10H7V6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


// BookList Component
const BookList: React.FC<{ books: Book[]; actions: LMSActions }> = ({ books, actions }) => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 text-lg p-10 bg-gray-800 rounded-xl shadow-inner">
          No books match your search. Try a different term or add a new book!
        </p>
      ) : (
        books.map(book => (
          <BookCard key={book.id} book={book} actions={actions} />
        ))
      )}
    </div>
  );
};


// Book Form Modal (For Adding Books)
const BookFormModal: React.FC<{ isOpen: boolean; onClose: () => void; addBook: (book: BookFormData) => void }> = ({ isOpen, onClose, addBook }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    publicationYear: new Date().getFullYear(),
    genre: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publicationYear' ? parseInt(value) || new Date().getFullYear() : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.isbn || formData.publicationYear < 1000) {
      setError('All fields are required and year must be valid.');
      return;
    }
    
    addBook(formData);
    onClose(); // Close the modal on success
    setFormData({ // Reset form
      title: '',
      author: '',
      isbn: '',
      publicationYear: new Date().getFullYear(),
      genre: '',
    });
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border-2 border-deep-mint transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-3xl font-bold text-deep-mint mb-6">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 bg-red-900/30 p-2 rounded-lg">{error}</p>}
          
          {/* Input Group */}
          {['title', 'author', 'isbn', 'genre'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-300 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field as keyof BookFormData] as string}
                onChange={handleChange}
                className="mt-1 block w-full p-3 rounded-lg bg-gray-700 border-gray-600 text-white focus:border-spearmint focus:ring-spearmint transition"
                required
              />
            </div>
          ))}

          {/* Year Input */}
          <div>
            <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-300">
              Publication Year:
            </label>
            <input
              type="number"
              id="publicationYear"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              className="mt-1 block w-full p-3 rounded-lg bg-gray-700 border-gray-600 text-white focus:border-spearmint focus:ring-spearmint transition"
              required
              min="1000"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button 
                type="button" 
                onClick={onClose} 
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300"
            >
                Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-deep-mint hover:bg-spearmint text-gray-900 font-bold rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.05]"
            >
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- 5. MAIN APP COMPONENT ---
const App: React.FC = () => {
  const { filteredBooks, setSearchTerm, addBook, deleteBook, toggleBorrowStatus } = useLMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Combine all actions into a single object for prop drilling
  const lmsActions: LMSActions = useMemo(() => ({
    addBook,
    deleteBook,
    toggleBorrowStatus,
  }), [addBook, deleteBook, toggleBorrowStatus]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans">
      <Header />
      
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <SearchBar 
          onSearch={setSearchTerm} 
          onAddClick={() => setIsModalOpen(true)}
        />
        
        <BookList books={filteredBooks} actions={lmsActions} />
      </main>
      
      <BookFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        addBook={addBook}
      />

      <Footer />
    </div>
  );
};

export default App;
