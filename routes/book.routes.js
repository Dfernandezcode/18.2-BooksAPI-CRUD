// express req (npm i express)
const express = require("express");
// Models
const { Book } = require("../models/Book.js");
// Routers - book only.
const router = express.Router();

// ROUTES

// Home Route: - CRUD: READ
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

// search functionality: - CRUD: READ
router.get("/book", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((error) => res.status(500).json(error));
});

router.get("/book/:id", (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({});
      }
    })
    .catch((error) => res.status(500).json(error));
});

// search by title (or other parameter): - CRUD: Custom Operation.
router.get("/book/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    // const book = await Book.find({ title: title });
    const book = await Book.find({ title: new RegExp("^" + title.toLowerCase(), "i") });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Endpoint user creation: - CRUD: CREATE
router.post("/book", async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
    });

    const createdBook = await book.save();
    return res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Book delete: - CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    // returns deleted user
    const id = req.params.id;
    const bookDeleted = await Book.findByIdAndDelete(id);
    if (bookDeleted) {
      res.json(bookDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Book update: - CRUD: UPDATE
// (req.body) is an object with all info to be updated.
// { new: true } - is a parameter that will return "new updated database entry"
router.put("/:id", async (req, res) => {
  try {
    // returns deleted book
    const id = req.params.id;
    const bookUpdated = await Book.findByIdAndUpdate(id.req.body, { new: true });
    if (bookUpdated) {
      res.json(bookUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { bookRouter: router };
