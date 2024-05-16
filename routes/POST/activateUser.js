const activateUser = require('express').Router();
const modelUser = require('../../database/userModel');
activateUser.post('/activateuser', async (req, res) => {
const { email, code } = req.body;

   
    const user = await modelUser.findOne({ email, code });
    if (!user) {
        return res.status(400).json({ message: 'Invalid verification code' });
    }


    user.isActive = true;
    await user.save();
    res.status(200).json({ message: 'Account activated successfully' });
});



module.exports = activateUser;