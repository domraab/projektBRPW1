const getProduct = require('express').Router();
const productModel = require('../../database/productModel');

getProduct.get("/getproduct", async (req, res) => {
productModel.find({})
.then(docs => {
    return res.json({
        msg: "Úspěšně se nám podařilo získat produkty",
        documents: docs
    });
})
.catch(err => {
    return res.json({
        msg: "Bohužel nedošlo k získání produktů",
        documents: []
    });
});
});

module.exports = getProduct;