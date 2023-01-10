const express = require('express')
const app = express();
app.post('/api/events', (req, res) => {
    const { name, location, date } = req.body
    res.send({ success: true });
})
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
