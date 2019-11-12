const express = require('express');
const database = require('./database');

const app = express();
database.connect();

app.get('/api/applications', (req, res) => {
  const sql = 'SELECT * from applications';
  database.query(sql,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    });

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
