const express = require('express')
const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
const bodyParser = require('body-parser');
const nodemon = require('nodemon');


const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions))

const events = [
    { id: 1, name: 'Event 1', location: 'Location 1', date: '2022-01-01' },
    { id: 2, name: 'Event 2', location: 'Location 2', date: '2022-01-02' },
    { id: 3, name: 'Event 3', location: 'Location 3', date: '2022-01-03' },
];

app.post('/api/events', (req, res) => {
    const { name, location, date } = req.body
    events.push({ id: events.length + 1, name, location, date });
    // res.redirect(`/api/events?name=${name}&location=${location}&date=${date}`);
})

app.get('/api/events', (req, res) => {
    // const { name, location, date } = req.query

    // if (!!name) {
    //     events.push({ id: events.length + 1, name, location, date });
    // }
    res.send(events);
})
app.listen(3001, () => {
    console.log('Server is listening on port 3001');
})

