const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./routes');
const {dbConnect} = require("./helpers/db");

app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));

app.use('/', routes);

dbConnect(app);
