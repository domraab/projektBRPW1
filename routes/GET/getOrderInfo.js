const getOrderInfo = require('express').Router();
const modelOrder = require('../../database/orderModel');

getOrderInfo.get("/get-order/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await modelOrder.find({ _id: orderId }).populate('products.productId');
        return res.json({
            msg: "úspěšně se nám podařilo získat pozice",
            documents: order
        });
    } catch (err) {
        console.error("Chyba při získávání pozic:", err);
        return res.status(500).json({
            msg: "Bohužel nedošlo k získání pozic",
            documents: []
        });
    }
});

module.exports = getOrderInfo;