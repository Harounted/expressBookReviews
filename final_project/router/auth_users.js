const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {
    username: "Ted",
    password: "123456",
  },
  {
    username: "Lisa",
    password: "1234567",
  },
];

const isValid = (username) => {
  const user = users.find((user) => user.username === username);
  if (!user) return false;

  return true;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return false;
  }
  return true;
};

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  if (!authenticatedUser(username, password)) {
    res.status(401).send("wrong credentials");
  }
  const token = jwt.sign({ username }, "superSecretMegaSecureMessageShhhh");
  return res.status(200).json({ message: "Login successful.", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);
  book = books[parseInt(isbn)];
  book.reviews[req.currentUser] = {
    review: req.query.review,
  };

  res.json(book);
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);
  book = books[parseInt(isbn)];
  delete book.reviews[req.currentUser];

  res.json(book);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
