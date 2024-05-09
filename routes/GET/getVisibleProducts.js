const getVisibleProduct = require('express').Router();
const productModel = require('../../database/productModel');

getVisibleProduct.get("/get-visible-product", async (req, res) => {
productModel.find({isVisible:true})
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

module.exports = getVisibleProduct;