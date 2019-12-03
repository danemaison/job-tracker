const mysql = require('mysql');
const db = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

const defaultData = [
  {
    company: 'Taco Bell',
    position: 'Waiter',
    applied: 1572634800000,
    status: 'rejected',
    interview: 1574899200000,
    notes: ''
  },
  {
    company: 'LearningFuze',
    position: 'TA',
    applied: 1573344000000,
    status: 'waiting',
    interview: 1573776000000,
    notes: ''
  },
  {
    company: 'Facebook',
    position: 'Full-Stack Developer',
    applied: 1572634800000,
    status: 'waiting',
    interview: 1574899200000,
    notes: ''
  },
  {
    company: 'Applesauce Inc',
    position: 'Taste Tester',
    applied: 1573862400000,
    status: 'waiting',
    interview: 1575411414542,
    notes: 'Need this.'
  },
  {
    company: 'Netflix',
    position: 'Frontend Engineer',
    applied: 1574553600000,
    status: 'rejected',
    interview: 1575057600000,
    notes: ''
  }
];

let sql = 'DELETE FROM table `applications` where `user`=1';

db.query(sql, (err, result) => {
  if (err) throw err;
  for (let entity of defaultData) {

    let sql = `INSERT INTO applications
    (company, applicationDate, status, interviewDate, user, position, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    let params = [
      entity.company,
      entity.applied,
      entity.status,
      entity.interview,
      1,
      entity.position,
      entity.notes
    ];

    db.query(sql, params);
  }

});
