const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "superSecretMegaSecureMessageShhhh",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  user = jwt.decode(req.headers.authorization.split(" ")[1]);
  req.currentUser = user.username;
  console.log(req.currentUser);
  next();
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));





// Ted Token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlZCIsImlhdCI6MTY5MTkzMTgwOH0.NBdsJ57UZZVqNaRUw6gexspe4_aMaKYO3SGs6LCUD7g
// Lisa Token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpc2EiLCJpYXQiOjE2OTE5MzMyNzF9.7zwJSDpoASYxUy0BAP1CQnMdz9IrcOQfV6-nDT71hMI