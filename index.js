// INDEX.JS - creates generic router

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

router.get("*", (req, res) => {
  res.status(404).send("Sorry we couldn't find the page requested - (Error 404).");
});

// Using these routes:
// ORDER IS IMPORTANT! - MOST RESTRICTIVE to LEAST.

server.use("/book", bookRouter);
server.use("/", router);
server.listen(PORT, () => {
  console.log(`Server online using ${PORT}`);
});

// What is CRUD? =  Create.Read.Update.Delete

/*
TO DO: ([-todo] [+complete])
  +Refactor code 18.2.1
  -Use book API
    - extend to have complete CRUD
    + create book
    + read book database
    + update book
    + delete book
  - Move to POSTMAN
  -test all petitions
    -GET BY ID
    -GET BY TITLE
    -GET BOOKS
    -CREATE
    -UPDATE
    -DELETE
*/
