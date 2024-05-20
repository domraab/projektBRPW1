const mongoose = require('mongoose');
const order = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true, 
    },
    address: {
        type:String,
        required: true
    },
    phone: {
        type:Number,
        required: true
    },
    price:{
      type:Number,
      required: true
    },
    products: [{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }],
   
});

module .exports = mongoose.model("Order", order);