const express = require('express');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const { createSession, deleteSession } = require('../service/session');


const router = express.Router();


router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.get('/signin', (req, res) => {
    return res.render('signin');
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    await User.create({
        fullName,
        email,
        password
    });

    return res.render('profile');
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const userInfo = await User.findOne({ email })
    console.log(userInfo);

    if (!userInfo) {
        return res.render("signin", {
            error: "Invalid Email or Password",
        });
    }

    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (!isMatch) {
        return res.render("signin", {
            error: "Invalid Email or Password",
        });
    };

    const sessionId = createSession(userInfo._id);

    res.cookie("sessionId", sessionId);

    return res.redirect("/profile");
});

router.post('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId;

    deleteSession(sessionId);
    res.clearCookie("sessionId");

    return res.redirect('/');
});



module.exports = router;