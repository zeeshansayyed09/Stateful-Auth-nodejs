const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }
}, { timestamps: true });



userSchema.pre('save', async function (next) {
    const UserObj = this;
    if (!UserObj.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(UserObj.password, 10);

    UserObj.password = hashedPassword;
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;cls