const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const path = require("path");
const showInfoPage = require(path.join(__dirname, '../front/InfoPages/ShowRU/app.js'));


const services = require(path.join(__dirname, 'Auth/authservices.js'));
const db = require(path.join(__dirname, '/DB/consults.js'));

router.use(express.json());
router.use(express.text());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());


router.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname, '/../front/Login/log.html'));
})


router.post("/register", (req, res) => {

  services.hashPassword(req.body.password).then((hashedPassword)=>{
    
    db.createUser(req.body.username, req.body.gmail, hashedPassword).then((result) => {
      res.cookie("infouser", { "message": result }).redirect("https://techlog-production.up.railway.app/auth/");
    }).catch((e) => {
      res.cookie("infouser", { "message": e }).redirect("https://techlog-production.up.railway.app/auth/");
    });
  
  });

});

  

router.get("/auth", (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>InfoUser</title>
</head>
<script>
  
alert("${req.cookies.infouser.message}");
window.location.href = "https://techlog-production.up.railway.app/";
</script>

<body>

</body>

</html>
`);
})




router.post("/uregistred", (req, res) => {
  let { username, password } = req.body;

  db.login(username, password)
    .then((response) => {
      if (response === 'Has iniciado sesion') {
        // Crea la cookie `isAuthenticated` en `true`
        res.cookie("isAuthenticated", true, { httpOnly: true, secure: false });

        // Redirige al contenido protegido después del inicio de sesión
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>InfoUser</title>
          </head>
          <script>
            alert("${response}");
            window.location.href = "/";
          </script>
          <body></body>
          </html>
        `);
      } else {
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>InfoUser</title>
          </head>
          <script>
            alert("${response}");
            window.location.href = "/login";
          </script>
          <body></body>
          </html>
        `);
      }
    })
    .catch((e) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>InfoUser</title>
        </head>
        <script>
          alert("${e}");
          window.location.href = "/login";
        </script>
        <body></body>
        </html>
      `);
    });
});




module.exports = router;
