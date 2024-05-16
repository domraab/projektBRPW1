const getUserInfo = require('express').Router();
const userModel = require('../../database/userModel');
const CheckToken = require('../GET/checkToken');

getUserInfo.get("/getUserInfo", CheckToken, async (req, res) => {
   
    const userId = req.user.id; 

    userModel.findById(userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({ msg: "Uživatel nenalezen" });
        }
        return res.json({
            msg: "Úspěšně se nám podařilo získat informace o uživateli",
            userInfo: user.name,
        });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ msg: "Nastala chyba při získávání informací o uživateli" });
    });
});

module.exports = getUserInfo;
