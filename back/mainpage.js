const express = require("express");
const router = express.Router();

//create endpoint to return the mainpage file

router.get("/", (req, res) => {
  res.sendFile(`${__dirname}/../front/index.html`);
})

router.get("style.css", (req, res) => {
  res.send(`${__dirname}/../front/css/style.css`);
})

module.exports = router

