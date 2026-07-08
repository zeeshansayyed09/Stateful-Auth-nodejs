const { getSession } = require("../service/session");
const User = require("../models/user");

async function restrictUserOnly(req, res, next) {

    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        return res.redirect("/user/signin");
    }

    const session = getSession(sessionId);

    if (!session) {
        return res.redirect("/user/signin");
    }

    const user = await User.findById(session.userId);

    if (!user) {
        return res.redirect("/user/signin");
    }

    req.user = user;

    next();
}

module.exports = {
    restrictUserOnly,
};