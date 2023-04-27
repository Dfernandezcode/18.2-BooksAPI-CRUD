// express req (npm i express)
const express = require("express");
const { bookRouter } = require("./routes/book.routes.js");
// BBDD connection
const { connect } = require("./db.js");
connect();

// Express router creation:
const PORT = 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Delegate all /book routes.
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Our API Homepage");
});

// Using these routes:
server.use("/", router);
server.use("/book", bookRouter);
server.listen(PORT, () => {
  console.log(`Server online using ${PORT}`);
});

/*
TO DO:
  -Refactor code 18.2 - video 1
  -Use book API
    - extend to have complete CRUD
    - create book
    - update book
    - delete book
  - Move to POSTMAN
  -test all petitions
    -GET BY ID
    -GET BY TITLE
    -GET BOOKS
    -CREATE
    -UPDATE
    -DELETE
*/
