import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Floral', 'Woody', 'Citrus', 'Oriental', 'Aquatic', 'Herbal', 'Fresh']
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    tag: {
        type: String,
        enum: ['Bestseller', 'New', 'Premium', 'Signature', 'Fresh', 'Relaxing', '']
    },
    size: {
        type: String,
        default: '100ml'
    }
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
