const express = require('express');
const deleteProduct = express.Router();
const modelProduct = require('../../database/productModel');

deleteProduct.delete("/delete-product/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await modelProduct.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Dodavatel nebyl nalezen." });
        }
    
        return res.json({ msg: `Produkt ${deletedProduct.name} byl smazán `});
    } catch (err) {
        // ZachycenĂ­ a zpracovĂˇnĂ­ chyby
        console.error("Chyba pĹ™i mazĂˇnĂ­ dodavatele:", err);
        return res.status(500).json({ msg: "Nastala chyba pĹ™i mazĂˇnĂ­ dodavatele." });
    }
});

module.exports = deleteProduct;