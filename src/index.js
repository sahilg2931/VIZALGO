const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const pubdirectory = path.join(__dirname, '../public');

app.use(express.static(pubdirectory));//sets up public files on server

app.listen(port, () => {

});