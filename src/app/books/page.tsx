"use client"; 

import { useState, useEffect } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]); // Books state
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  const addBook = async () => {
    setLoading(true);
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    setNewBook({ title: "", author: "" }); // Clear input fields
    fetchBooks(); // Refresh book list
    setLoading(false);
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    await fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchBooks();
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6  bg-yellow-100">
      <h1 className="text-2xl font-bold">Books</h1>
      <div className="my-4 ">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-black px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </div>
      <ul className="list-disc pl-6">
        {books.map((book) => (
          <li key={book.id} className="my-2 flex items-center">
            <span className="flex-1">
              {book.title} by {book.author}
            </span>
            <button
              onClick={() => deleteBook(book.id)}
              className="bg-rose-800 text-white px-4 py-2 rounded-full" 
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

