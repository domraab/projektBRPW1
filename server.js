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
const getUserInfo = require('./routes/GET/getUserInfo');
const saveCategory = require('./routes/POST/saveCategory');
const getCategory = require('./routes/GET/getCategory');
const deleteCategory = require('./routes/POST/deleteCategory');
const updateCategory = require('./routes/POST/updateCategory');
const getCategoryById = require('./routes/GET/getCategoryById')
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
app.use("/",cors(), getUserInfo);
app.use("/",cors(), getCategory);
app.use("/",cors(), getCategoryById);
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
app.use("/",cors(), saveCategory);
app.use("/",cors(), deleteCategory);
app.use("/",cors(), updateCategory);