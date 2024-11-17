import { NextResponse } from "next/server";

let Books = [
  {
    id: 1,
    title: "The Power of Now",
    author: "Eckhart",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
  },
  {
    id: 3,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
  },
  {
    id: 4,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
  },
  {
    id: 5,
    title: "You Can Win",
    author: "Shiv Khera",
  },
];

// GET Method: Fetch all books
export function GET() {
  return NextResponse.json(Books);
}

// POST Method: Add a new book
export async function POST(request: Request) {
  try {
    const newBook = await request.json();
    Books.push({
      id: Books.length + 1,
      ...newBook,
    });
    return NextResponse.json({ message: "Book added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding book" }, { status: 500 });
  }
}

// DELETE Method: Remove a book by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    Books = Books.filter((book) => book.id !== id);
    return NextResponse.json({ message: "Book deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting book" }, { status: 400 });
  }
}
