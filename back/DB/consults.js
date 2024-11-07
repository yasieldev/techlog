const mysql = require("mysql2");  // Cambiado a mysql2
const services = require(`${__dirname}/../Auth/authservices.js`);
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require("../../config.js");

let connection = mysql.createConnection({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

function createUser(username, gmail, password) {
  return new Promise((resolve, reject) => {
    verifyUser(username).then(verify => {
      if (verify) {
        addUser(username, gmail, password)
          .then(message => {
            console.log(message);
            resolve(message);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      } else {
        console.log("El usuario ya existe");
        reject("El usuario ya existe");
      }
    }).catch(e => {
      console.log(`Ha ocurrido un error en la verificación del usuario: ${e}`);
      return false;
    });
  });
}

function verifyUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE username LIKE ?`, [username], (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.length === 0);
      }
    });
  });
}

function addUser(username, gmail, password) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users (username, gmail, password) VALUES (?, ?, ?)`, [username, gmail, password], (err, res, fields) => {
      if (err) {
        reject("Ha ocurrido un error: " + err);
      } else {
        resolve("El usuario ha sido creado");
      }
    });
  });
}

function login(username, password) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE username LIKE ?`, [username], (err, res, fields) => {
      if (err) {
        reject(err);
      } else if (res.length === 0) {
        reject("El usuario no existe, debe registrarse para poder iniciar sesión");
      } else {
        comparePassword(username, password).then(res => resolve("Has iniciado sesion")).catch(e => reject(e));
      }
    });
  });
}

function comparePassword(username, password) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT password FROM users WHERE username = ?`, [username], (err, res, field) => {
      if (err) {
        reject(err);
      } else {
        services.verifyPassword(password, res[0].password).then((res) => {
          if (res) {
            resolve(`Hola ${username}, ha iniciado sesión correctamente`);
          } else {
            reject("La clave es incorrecta");
          }
        }).catch((e) => {
          reject(e);
        });
      }
    });
  });
}

module.exports = { createUser, login };

