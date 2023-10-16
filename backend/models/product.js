const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true,
        maxlength: [100, "product length can not exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
        maxlength: [5, "product length can not exceed 100 characters"],
        default: 0.0
    },
    discription: {
        type: String,
        required: [true, "Please enter the product discription"]
    },
    images:[
        {
            public_id: {
                type: String
                , required: true
            },

            url: {
                type: String, required: true
            }
        }

    ],
    category: {
        type: String,
        required: [true, "Please select category for this product"],
        enum: {
            values: [
                "RUNNING",
                "FOOTBALL",
            ],
            message: "please select category"
        }

    },
    seller: {
        type: String,
        required: [true, "Please enter the product seller"],
    },

    ratings: {
    type: Number,
    default: 0
},
    numofreviews: {
    type: Number,
    default: 0
},
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: { type: String, required: true },
        rating: { type: String, required: true },
        comment: { type: String, required: true }
    }],

    stock: {
    type: String,
    required: [true, "Please enter the product stock"],
    maxlength: [5, "Please can not exceed 5 characters"],
    default: 0
},
    user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
},
    createdAt: {
    type: Date,
    default: Date.now
}


})

module.exports = mongoose.model("Product", productSchema)