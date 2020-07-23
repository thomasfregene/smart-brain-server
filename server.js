const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const app = express();

//middleware
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

//signin
app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare("apples", '$2a$10$WrxlNC.n.F2Q7SOP2DAFJOkRbHBcrwJlZmkfB7rkWyWpUw.zHh3Ae', function (err, res) {
    console.log('first guess ', res);
  });
  bcrypt.compare("veggies", '$2a$10$WrxlNC.n.F2Q7SOP2DAFJOkRbHBcrwJlZmkfB7rkWyWpUw.zHh3Ae', function (err, res) {
    console.log('first guess ', res);
  });
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

//register
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  /*bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });*/

  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

//get by id
app.get("/profile/:id", (req, res) => {
  //destructuring props
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});



app.listen(4000, () => {
  console.log("app is running on port 4000");
});
