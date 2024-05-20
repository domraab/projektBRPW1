const getProductVisibility = require('express').Router();
const modelProduct = require('../../database/productModel');

getProductVisibility.get("/get-visibility/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await modelProduct.findById(productId);
        
        if (!product) {
            return res.json({
                msg: "Produkt nebyl nalezen"
            });  
        }
        
        return res.json({
            msg: product.isVisible ? "true" : "false",
        });
        
    } catch (err) {
        console.error("Chyba při získávání produktu:", err);
        return res.status(500).json({
            msg: "Nedošlo k získání produktu",
            documents: []
        });
    }
});

module.exports = getProductVisibility;