const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  return res.status(300).json({ message: "registration page" });
});

// Get the book list available in the shop
public_users.get("/", (req, res) => {
  return res.status(300).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  book = books[parseInt(req.params.isbn)];

  return res.status(300).json(book);
});

// Please don't forget that urls should not have spaces so you should pass the author names in
// this format : name%20lastname
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author;
  const book = Object.values(books).find((book) => book.author === author);

  return res.status(300).json(book);
});

// Get all books based on title
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title;
  const book = Object.values(books).find((book) => book.title === title);
  return res.status(300).json(book);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const bookIsbn = req.params.isbn;
  const book = books[parseInt(req.params.isbn)];
  const review = book.reviews;
  return res.status(300).json(review);
});

module.exports.general = public_users;
