const saveUser = require('express').Router();
const modelUser = require('../../database/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''  
    }
});

const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000);
};

saveUser.post("/save-user", async (req, res) => {
    const { name, email, password } = req.body;
    const verificationCode = generateVerificationCode();
    const hashedPassword = await bcrypt.hash(password, 10);
    const activateadress = "http://localhost:3000/activate";

    try {
        const user = new modelUser({
            name: name,
            email: email,
            password: hashedPassword,
            code: verificationCode,
            
        });

        const savedUser = await user.save();

        await transporter.sendMail({
            to: email,
            subject: 'Verification Code',
            html: `Váš ověřovací kód: <strong>${verificationCode}</strong></p>`
        });

        res.json({
            msg: `Uživatel ${savedUser.email} byl úspěšně uložen a ověřovací kód byl odeslán na e-mail.`
        });
    } catch (error) {
        console.error("Chyba při ukládání uživatele:", error);
        res.status(500).json({ msg: "Bohužel došlo k chybě při ukládání uživatele nebo odesílání ověřovacího kódu." });
    }
});

module.exports = saveUser;
