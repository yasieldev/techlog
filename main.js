const express = require("express");
const app = express();
require("dotenv").config({ path: `${__dirname}/Configs/.env` });
const {PORT} = require("./config.js");
const session = require('express-session');


app.use(session({
  secret: 'techlogsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


app.use('/', express.static(`${__dirname}/front/SubPages/`));
app.use('/', require(`${__dirname}/back/SubPages_back/srv.js`));
app.use("/", express.static(`${__dirname}/front/`));
app.use("/", require(`${__dirname}/back/routes.js`));
app.use('/', require(`${__dirname}/back/mainpage.js`));
app.use("/", express.static(`${__dirname}/front/Login/`));
app.use("/", require(`${__dirname}/back/SubPages_back/vd.js`));
app.use('/', express.static(`${__dirname}/front/SubPages/Private`));



console.log(__dirname)



app.listen(PORT, () => {
  console.log(`server listening in ${PORT} port`); });
