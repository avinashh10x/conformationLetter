require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/Db');
const letterRoutes = require('./routes/letterRoutes');


const app = express();

connectDb();

app.use(cors(),
    express.urlencoded({ extended: true })
    , express.json());
app.use(express.json());

// Routes
app.use('/api', letterRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('This is home route');
});


app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
