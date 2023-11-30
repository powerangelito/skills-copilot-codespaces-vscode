// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = express.Router();
const mysql = require('mysql');
const config = require('./config.json');
const connection = mysql.createConnection(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);

// GET comments
router.get('/comments', (req, res) => {
  connection.query('SELECT * FROM comments', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:\n');
    res.send(rows);
  });
});

// POST comments
router.post('/comments', (req, res) => {
  const comment = {
    comment: req.body.comment,