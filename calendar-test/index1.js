
'use strict';
const ics = require('./ical');
const express = require('express');
const app = express();

app.get('/api/calendar/subscribe', (req, res) => {
  // for demo purpose just create iCal on the fly
  let iCal = ics.createNew('iCal by Chris', null, null, null, 'ICAL DEMO TESTING');
  let iCalString = iCal.toICSString();

  res.set('Content-Type', 'text/calendar;charset=utf-8');
  res.set('Content-Disposition', 'attachment; filename="worktile.pro.calendar.my.ics"');
  res.send(iCalString);
});

const port = 22222;
app.listen(port);
console.log(`Application started at ${port}`);
