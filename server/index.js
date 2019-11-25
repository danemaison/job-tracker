const path = require('path');
const express = require('express');
const database = require('./database');
const bcrypt = require('bcryptjs');
const authorize = require('./authorize');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
database.connect();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/api/applications', authorize, (req, res) => {
  const sql =
    'SELECT * from applications WHERE user = ? ORDER BY applicationDate DESC';
  const params = [req.user.id];
  database.query(sql,
    params,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.post('/api/add-application', authorize, (req, res) => {
  const { company, position, status, notes } = req.body;
  const interviewDate = req.body.interviewDate.split('T')[0];
  const applicationDate = req.body.applicationDate.split('T')[0];

  const sql = `INSERT INTO applications
  (company, applicationDate, status, interviewDate, user, position, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    company,
    applicationDate,
    status,
    interviewDate || null,
    req.user.id,
    position,
    notes || null];

  database.query(
    sql,
    params,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.put('/api/update-application', authorize, (req, res) => {
  const { company, position, status, notes, id } = req.body;
  const interviewDate = req.body.interviewDate && req.body.interviewDate.split(
    'T'
  )[0];
  const applicationDate = req.body.applicationDate.split('T')[0];

  const sql = `UPDATE applications
  SET company = ?, applicationDate = ?, status = ?, interviewDate = ?, position = ?, notes = ?
  WHERE id = ? AND user = ?`;

  const params = [
    company,
    applicationDate,
    status,
    interviewDate || null,
    position,
    notes || null,
    id,
    req.user.id
  ];

  database.query(
    sql,
    params, (err, result) => {
      if (err) throw err;
      res.send(result);
    });

});

app.delete('/api/applications', authorize, (req, res) => {
  const appId = req.query.app_id;
  // if (!appId) throw error;

  const sql = `DELETE FROM applications WHERE id = ? AND user = ?`;
  const params = [appId, req.user.id];

  // Implement res
  database.query(
    sql,
    params,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post('/api/register', (req, res) => {
  let { username, password } = req.body;
  let sql = `SELECT id FROM users WHERE username = ?`;

  database.query(sql, [username], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ error: { type: 'username',
        message: 'Invalid username' }
      });
    } else {
      sql = `INSERT INTO users SET username = ?, password = ?`;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          database.query(sql, [username, hash], (err, result) => {
            if (err) throw err;
            const token = jwt.sign({ id: result.insertId }, process.env.TOKEN_SECRET);
            res.cookie('logged-in', 'true');
            res.cookie('auth-token', token, { httpOnly: true }).send({ token });
          });
        });
      });
    }
  });

});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT id, password FROM users WHERE username = ?';

  database.query(sql, [username], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ error: { message: 'Invalid username or password' } });
      return;
    }
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
        res.cookie('logged-in', 'true');
        res.cookie('auth-token', token, { httpOnly: true }).send({ token });
      } else {
        res.send({ error: { message: 'Invalid username or password' } });
      }
    });
  });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('auth-token');
  res.clearCookie('logged-in');
  res.send({ message: 'Logged out' });
});

app.post('/api/guest-login', (req, res) => {
  const token = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET);
  res.cookie('logged-in', 'true');
  res.cookie('auth-token', token, { httpOnly: true }).send({ token });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
