const updateProduct = require('express').Router();
const modelProduct = require('../../database/productModel');

updateProduct.put("/update-product/:productId", (req, res) => {
    const productId = req.params.productId;
    const { name, code, category, description} = req.body;
    
  
    modelProduct.findByIdAndUpdate(productId, { name:name,
        name:name,
        code:code,
        category:category,
        description:description}, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ msg: "Produkt nebyl nalezen." });
            }
            return res.json({ msg: `Sklad ${updatedProduct.name} byl ĂşspÄ›ĹˇnÄ› aktualizovĂˇn.`, updatedProduct });
        })
        .catch(err => {
            console.error("Chyba pĹ™i aktualizaci produktu:", err);
            return res.status(500).json({ msg: "Nastala chyba pĹ™i aktualizaci produktu." });
        });
});

module.exports = updateProduct;