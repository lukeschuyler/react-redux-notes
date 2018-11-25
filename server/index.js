const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

mongoose.connect('mongodb://localhost:27017/auth');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app); 

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);
