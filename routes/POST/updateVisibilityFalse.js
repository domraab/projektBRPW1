const updateVisibleFalseProduct = require('express').Router();
const modelProduct = require('../../database/productModel');

updateVisibleFalseProduct.put("/update-visible-product-false/:productId", (req, res) => {
    const productId = req.params.productId;
  
    modelProduct.findByIdAndUpdate(productId, { 
        isVisible:false
    }, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ msg: "Produkt nebyl nalezen." });
            }
            return res.json({ msg: `${updatedProduct.name} byl úspěšně aktualizován.`, updatedProduct });
        })
        .catch(err => {
            console.error("Chyba při aktualizaci produktu:", err);
            return res.status(500).json({ msg: "Nastala chyba při aktualizaci produktu." });
        });
});

module.exports = updateVisibleFalseProduct;