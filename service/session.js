const crypto = require("crypto");

const sessions = new Map();

function createSession(userId) {
    const sessionId = crypto.randomUUID();

    sessions.set(sessionId, {
        userId,
        createdAt: Date.now(),
    });

    return sessionId;
};


function getSession(sessionId) {
    return sessions.get(sessionId);
};

function deleteSession(sessionId) {
    sessions.delete(sessionId);
};

module.exports = {
    createSession,
    getSession,
    deleteSession,
};
