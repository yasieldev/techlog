const express = require("express");
const router = express.Router();
const path = require("path");

function verifyUser(req, res, next) {
  if (req.session && req.session.user) {
    next(); // Si el usuario está autenticado, continúa a la ruta
  } else {
    res.redirect("https://techlog-production.up.railway.app/login"); // Redirige al login si no está autenticado
  }
}

//create an endpoint to return the content page:

router.get("/content", verifyUser ,(req, res)=>{
  res.sendFile(path.join(__dirname, '../../front/SubPages/Private/audiovisual.html'));
})


module.exports = router;
