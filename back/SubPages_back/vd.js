const express = require("express");
const router = express.Router();
const path = require("path");


function verifyUser(req, res, next) {
  if (req.cookies.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}



//create an endpoint to return the content page:

router.get("/content", verifyUser, (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/SubPages/Private/audiovisual.html'));
});



module.exports = router;
