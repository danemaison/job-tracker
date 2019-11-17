const path = require('path');
const express = require('express');
const database = require('./database');
const mysql = require('mysql');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
database.connect();

app.get('/api/applications', (req, res) => {
  const sql = 'SELECT * from applications';
  database.query(sql,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    });

});

app.post('/api/add-application', (req, res) => {
  const { company, position, status, notes } = req.body;
  const interviewDate = req.body.interviewDate.split('T')[0];
  const applicationDate = req.body.applicationDate.split('T')[0];
  console.log(company, position, applicationDate, status, interviewDate, notes);

  const sql = `INSERT INTO applications
  (id, company, applied, status, interviewDate, user, position, notes)
  VALUES
  (NULL, '${company}', '${applicationDate}', '${status}', NULL, '1', '${position}', NULL)`;
  database.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

app.put('/api/update-application', (req, res) => {
  console.log(req.body);
  const sql = `UPDATE applications SET status=${status} WHERE id=${id}`;

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
