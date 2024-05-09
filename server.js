require('dotenv').config();
const express = require('express');
const connectDB = require('./database/connect')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const saveUser = require('./routes/POST/saveUser');
const activateUser = require('./routes/POST/activateUser');
const login = require('./routes/POST/login');
const saveProduct = require('./routes/POST/saveProduct');
const getProduct = require('./routes/GET/getProduct');
const deleteProduct = require('./routes/POST/deleteProduct');
const getProductByID = require('./routes/GET/getProductById');
const updatedProduct = require('./routes/POST/updateProduct');
const CheckLogin = require('./routes/GET/checkLogin');
const getVisibleProduct = require('./routes/GET/getVisibleProducts');
const updateVisibleProduct = require('./routes/POST/updateVisibleProduct');
connectDB();

app.listen(PORT, () => {
    console.log(`Server běží na ${PORT}!`);
});

app.use(express.json({extended:false}));
/*
GET
*/
app.use("/",cors(), getProduct);
app.use("/",cors(), getProductByID);
app.use("/",cors(), CheckLogin);
app.use("/",cors(), getVisibleProduct);

/*
Post
*/
app.use("/",cors(), saveUser);
app.use("/",cors(), activateUser);
app.use("/",cors(), login);
app.use("/",cors(), saveProduct);
app.use("/",cors(), deleteProduct);
app.use("/",cors(), updatedProduct);
app.use("/",cors(), updateVisibleProduct);