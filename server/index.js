const path = require('path');
const express = require('express');
const database = require('./database');
const bcrypt = require('bcryptjs');
const sessions = require('./sessions');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
database.connect();

app.get('/api/applications', (req, res) => {
  const sql = 'SELECT * from applications ORDER BY applicationDate DESC';
  database.query(sql,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    });

});

app.post('/api/add-application', (req, res) => {
  const { company, position, status, notes } = req.body;
  const interviewDate = req.body.interviewDate.split('T')[0];
  const applicationDate = req.body.applicationDate.split('T')[0];

  const sql = `INSERT INTO applications
  (company, applicationDate, status, interviewDate, user, position, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  database.query(
    sql,
    [company, applicationDate, status, interviewDate || null, 1, position, notes || null], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.put('/api/update-application', (req, res) => {
  const { company, position, status, notes } = req.body;
  const interviewDate = req.body.interviewDate && req.body.interviewDate.split(
    'T'
  )[0];
  const applicationDate = req.body.applicationDate.split('T')[0];

  const sql = `UPDATE applications
  SET company = ?, applicationDate = ?, status = ?, interviewDate = ?, position = ?, notes = ?
  WHERE id = ${req.body.id}`;

  database.query(
    sql,
    [company, applicationDate, status, interviewDate || null, position, notes || null], (err, result) => {
      if (err) throw err;
      res.send(result);
    });

});

app.delete('/api/applications', (req, res) => {
  const appId = req.query.app_id;
  console.log(appId);
  // if(!appId) throw error;
  const sql = `DELETE FROM applications WHERE id = ?`;

  // Implement res
  database.query(
    sql,
    [appId],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post('/api/register', (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;
  const sql = `INSERT INTO users SET username = ?, password = ?`;
  bcrypt
    .genSalt(10, (err, salt) =>
      bcrypt
        .hash(password, salt, (err, hash) => {
          if (err) throw err;
          database.query(sql, [username, hash], (err, result) => {
            if (err) throw err;
            res.send(result);
          });
        })
    );

});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT id, password FROM users WHERE username = ?';
  database.query(sql, [username], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
  // bcrypt.compare(password, )
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
