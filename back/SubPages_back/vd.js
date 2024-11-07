const express = require("express");
const router = express.Router();
const path = require("path");


function verifyUser(req, res, next) {
  if (req.session && req.session.user) {
    return next();  // Si el usuario está autenticado, pasa al siguiente middleware
  } else {
    res.redirect("/login");  // Si no está autenticado, redirige al login
  }
}


//create an endpoint to return the content page:

router.get("/content", verifyUser, (req, res) => {
  console.log(req.session.user);  // Verifica si los datos del usuario están en la sesión
  res.sendFile(path.join(__dirname, '../../front/SubPages/Private/audiovisual.html'));
});



module.exports = router;
