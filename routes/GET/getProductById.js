const getProductByID = require('express').Router();
const modelProduct = require('../../database/productModel');

getProductByID.get("/get-product/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await modelProduct.find({ _id: productId })
        return res.json({
            msg: "úspěšně se nám podařilo získat pozice",
            documents: product
        });
    } catch (err) {
        console.error("Chyba při získávání pozic:", err);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání pozic",
            documents: []
        });
    }
});

module.exports = getProductByID;