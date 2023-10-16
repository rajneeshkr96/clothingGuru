const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
     shippindInfo:{
        phoneNo: {type: String,required: true},
        address: {type: String,required: true},
        city: {type: String,required: true},
        state: {type: String,required: true},
        zipcode: {type: String,required: true},
        country: {type: String,required: true}
        
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems :[{
        name:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        images:{
            type: String,
            required: true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
       }],
       paidAt:{
        type: Date,
       },
       paymentInfo: {
        id: {type: String},
        status:{type: String}
       },
       itemsPrice: {
        type: Number,
        required: true,
        default: 0
        
        },
       texPrice: {
        type: Number,
        required: true,
        default: 0
        
        },
       ShippingPrice: {
        type: Number,
        required: true,
        default: 0
        
        },
       totalPrice: {
        type: Number,
        required: true,
        default: 0
        
        },
        orderStatus: {
            type: String,
            required: true,
            default: 'Pending'
        },
        deliverdAt:{
            type: Date,

        },
        createdAt :{
            type: Date,
            default: Date.now
        }
    

});



const Order = mongoose.model('Order', orderSchema);
module.exports = Order;