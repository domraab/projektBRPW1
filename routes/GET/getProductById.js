const getProductByID = require('express').Router();
const modelProduct = require('../../database/productModel');

getProductByID.get("/get-product/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await modelProduct.find({ _id: productId });
        return res.json({
            msg: "ĂšspÄ›ĹˇnÄ› se nĂˇm podaĹ™ilo zĂ­skat pozice",
            documents: product
        });
    } catch (err) {
        console.error("Chyba pĹ™i zĂ­skĂˇvĂˇnĂ­ pozic:", err);
        return res.status(500).json({
            msg: "BohuĹľel nedoĹˇlo k zĂ­skĂˇnĂ­ pozic",
            documents: []
        });
    }
});

module.exports = getProductByID;