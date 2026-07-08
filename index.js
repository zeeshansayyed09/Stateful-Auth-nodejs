const express = require('express')
const ejs = require('ejs');
const userRouter = require('./routes/user');
const { restrictUserOnly } = require('./middleware/authentication')
const { default: mongoose } = require('mongoose');
const cookieParser = require("cookie-parser");


const app = express();
const PORT = 2000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

mongoose.connect(`mongodb://127.0.0.1:27017/statefullauth`).then(() => {
    console.log("MongoDB is Connecting");
});


app.set('view engine', "ejs");

app.use('/user', userRouter);
app.get('/', (req, res) => {
    return res.render('home')
})

app.get('/profile', restrictUserOnly, (req, res) => {
    return res.render('profile', {
        user: req.user,
    });
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:2000`);
})