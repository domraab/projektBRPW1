const jwt = require('jsonwebtoken');
const userModel = require('../../database/userModel')

const CheckToken = async (req, res, next) => {
 
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({ message: 'Token není k dispozici' });
    }
    
    try {
    const token = tokenHeader.split(' ')[1];
    console.log(token);
    const decodedToken = await jwt.verify(token, 'secret');
    console.log(decodedToken);
    const user = await decodedToken;
    const userId = user.id;
    console.log(userId);
    const findedUser = await userModel.findById(userId);
    if(!findedUser){
      console.log('user neni nalezen');
      return res.status(404).json({ msg: "User nebyl nalezen." });
    }

    else{
      req.user = user;
      next();
    }
} catch (err) {
    return res.status(401).json({ message: "Invalid token, please login" });
}
};

module.exports = CheckToken;