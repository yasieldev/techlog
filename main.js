const express = require("express");
const app = express();
require("dotenv").config({ path: `${__dirname}/Configs/.env` });
const PORT = process.env.PORT;


app.use('/', express.static(`${__dirname}/front/SubPages/`));
app.use('/', require(`${__dirname}/back/SubPages_back/srv.js`));
app.use("/", express.static(`${__dirname}/front/`));
app.use("/", require(`${__dirname}/back/routes.js`));
app.use('/', require(`${__dirname}/back/mainpage.js`));
app.use("/", express.static(`${__dirname}/front/Login/`));


console.log(__dirname)



app.listen(PORT, () => {
  console.log(`server listening in ${PORT} port`); });
