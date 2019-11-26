const path = require('path');
const express = require('express');
const database = require('./database');
const bcrypt = require('bcryptjs');
const sessions = require('./sessions');
const authorize = require('./authorize');
const validate = require('./validate');
const { ApiError, errorHandler } = require('./errors');

const app = express();

app.use(sessions);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validate);

app.get('/api/applications', authorize, (req, res, next) => {
  const sql =
    'SELECT * from applications WHERE user = ? ORDER BY applicationDate DESC';
  const params = [req.session.userId];
  database.query(sql,
    params,
    (err, result) => {
      if (err) return next(err);
      res.send(result);
    });
});

app.post('/api/applications', authorize, (req, res, next) => {
  const { company, position, status, notes } = req.body;
  if (!company || !position || !status || !notes) {
    return next(new ApiError(400, 'Missing arguments'));
  }
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
    req.session.userId,
    position,
    notes || null];

  database.query(
    sql,
    params,
    (err, result) => {
      if (err) return next(err);
      res.json({ id: result.insertId });
    });
});

app.put('/api/applications', authorize, (req, res, next) => {
  const { company, position, status, notes, id } = req.body;

  if (!company || !position || !status || !id) {
    return next(new ApiError(400, 'Missing arguments'));
  }

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
    req.session.userId
  ];

  database.query(
    sql,
    params, (err, result) => {
      if (err) return next(err);
      res.status(200).json({});
    });

});

app.delete('/api/applications', authorize, (req, res, next) => {
  const appId = req.query.app_id;
  if (!appId) {
    return next(new ApiError(400, 'Invalid app id'));
  }

  const sql = `DELETE FROM applications WHERE id = ? AND user = ?`;
  const params = [appId, req.session.userId];

  database.query(
    sql,
    params,
    (err, result) => {
      if (err) return next(err);
      res.send(result);
    }
  );
});

app.post('/api/register', (req, res, next) => {

  let { username, password } = req.body;
  if (!username || !password) {
    return next(new ApiError(400, 'Invalid username/login'));
  }

  let sql = `SELECT id FROM users WHERE username = ?`;

  database.query(sql, [username], (err, result) => {
    if (err) return next(err);

    if (result.length > 0) {
      return next(new ApiError(400, 'Invalid username'));
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return next(err);
          let sql = `INSERT INTO users SET username = ?, password = ?`;
          database.query(sql, [username, hash], (err, result) => {
            if (err) return next(err);
            req.session.regenerate(err => {
              if (err) return next(err);
              req.session.userId = result.insertId;
              res.status(201).json({});
            });
          });
        });
      });
    }
  });

});

app.post('/api/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ApiError(400, 'Invalid Login'));
  }
  const sql = 'SELECT id, password FROM users WHERE username = ?';

  database.query(sql, [username], (err, result) => {
    if (err) return next(err);
    if (!result.length) {
      return next(new ApiError(401, 'Invalid username or password'));
    }
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) next(err);
      if (isMatch) {
        req.session.regenerate(err => {
          if (err) return next(err);
          req.session.userId = user.id;
          res.status(200).json({});
        });
      } else {
        return next(new ApiError(401, 'Invalid username or password'));
      }
    });
  });
});

app.get('/api/auth', (req, res, next) => {
  if (!req.session.userId) {
    return res.json({ user: null });
  }
  return res.json({ user: req.session.userId });
});

app.post('/api/logout', authorize, (req, res, next) => {
  req.session.destroy();
  res.status(200).json({});
});

app.post('/api/guest-login', (req, res, next) => {
  req.session.regenerate(err => {
    if (err) return next(err);
    req.session.userId = 1;
    res.status(201).json({});
  });
});

app.use('/api/*', (req, res, next) => {
  next(new ApiError(404, `Cannot ${req.method} ${req.originalUrl}.`));
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
