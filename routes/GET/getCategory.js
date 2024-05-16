const getCategory = require('express').Router();
const productModel = require('../../database/categoryModel');

getCategory.get("/getcategory", async (req, res) => {
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

module.exports = getCategory;