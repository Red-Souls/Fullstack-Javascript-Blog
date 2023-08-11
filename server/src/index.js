const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const route = require('./routes');
const db = require('./models');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads/', express.static('uploads'));
route(app);

db.sequelize.sync().then(res => {
    app.listen(port);
});