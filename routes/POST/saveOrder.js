// express router
const saveOrder = require('express').Router();
const modelOrder = require('../../database/orderModel');

// route for saving an order
saveOrder.post("/save-order", async(req, res) => {
    try {
        const { name, email, address, phone, products, price } = req.body;

        console.log(`Received order: ${name}, ${email}, ${address}, ${phone}, ${JSON.stringify(products)}`);

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).send('Product IDs are required and should be an array.');
        }

        for (let product of products) {
            if (!product.productId || !product.quantity || product.quantity < 1) {
                return res.status(400).send('Each product must have a productId and a quantity of at least 1.');
            }
        }

        const order = new modelOrder({
            name: name,
            email: email,
            address: address,
            phone: phone,
            products: products,
            price:price
        });

        await order.save();

        return res.json({
            msg: `Došlo k uložení objednávky`,
        });
    } catch (error) {
        console.error('Error saving order:', error);

        return res.status(500).json({
            msg: "Bohužel nedošlo k uložení objednávky"
        });
    }
});

module.exports = saveOrder;