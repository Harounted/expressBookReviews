const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send("please enter a user name and a paswword");
  }
  const existinguser = users.find((user) => user.username === username);
  if (existinguser) {
    res.status(403).send("username already in use");
  }
  const newUser = {
    username: username,
    password: password,
  };
  users.push(newUser);

  return res.status(201).json("user created succesfully");
});

// Get the book list available in the shop
public_users.get("/", async (req, res) => {
  try {
    const fetchedBooks = await getBooksPromise();
    res.json(fetchedBooks);
  } catch (error) {
    console.error("Could Not fetch the books", error);
  }
});

async function getBooksPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 500); // Simulating half a second of delay
  });
}

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  const book = await books[parseInt(req.params.isbn)];

  return res.status(300).json(book);
});

// Please don't forget that urls should not have spaces so you should pass the author names in
// this format : name%20lastname
public_users.get("/author/:author", async(req, res) => {
  const author =  req.params.author;
  const fetchedBooks = await Object.values(books).filter((book) => book.author === author);

  return res.status(300).json(fetchedBooks);
});

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  const fetchedBooks = await Object.values(books).filter((book) => book.title === title);

  return res.status(300).json(fetchedBooks);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const bookIsbn = req.params.isbn;
  const book = books[parseInt(req.params.isbn)];
  const review = book.reviews;

  return res.status(300).json(review);
});

module.exports.general = public_users;
