// how to add to DB
const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");

const bookList = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 543,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
  },
  {
    title: "For The Emperor (Ciaphas Cain Book 1)",
    author: "Alex Stewart",
    pages: 416,
  },
];

// connect and create map of bookList to add to database
connect().then(() => {
  console.log("Connected");

  // Delete data
  Book.collection.drop().then(() => {
    console.log("Books deleted");

    // Add books
    const documents = bookList.map((book) => new Book(book));

    Book.insertMany(documents)
      .then(() => console.log("Datos guardados correctamente!"))
      .catch((error) => console.error(error))
      .finally(() => mongoose.disconnect());
  });
});
