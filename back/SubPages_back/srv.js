const express = require("express");
const router = express.Router();
const path = require("path");

//create the endpoint to return the srv page

router.get("/services",(req, res)=>{
  res.sendFile(path.join(__dirname, '../../front/SubPages/services.html'));
})

router.get("/about",(req, res)=>{
  res.sendFile(path.join(__dirname, '../../front/SubPages/aboutus.html'))
})

router.get("estilos.css", (req, res) => {
  console.log(__dirname)
  res.send(path.join(__dirname, '../../front/SubPages/services_css/css/estilos.css'));
})

router.get("normalize.css", (req, res) => {
  res.send(path.join(__dirname, '../../front/SubPages/services_css/css/normalize.css'));
})

module.exports = router;
