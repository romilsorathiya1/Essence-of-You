import mongoose from 'mongoose';

const CustomizationSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String }
    },
    preferences: {
        // Scent preferences
        occasion: {
            type: String,
            enum: ['daily', 'office', 'evening', 'special']
        },
        mood: {
            type: String,
            enum: ['confident', 'romantic', 'fresh', 'calm']
        },
        scent_family: {
            type: String,
            enum: ['floral', 'woody', 'citrus', 'oriental']
        },
        intensity: {
            type: String,
            enum: ['light', 'moderate', 'strong', 'intense']
        },
        // Bottle preferences
        bottle_style: {
            type: String,
            enum: ['classic', 'round', 'modern', 'vintage']
        },
        bottle_color: {
            type: String,
            enum: ['clear', 'gold', 'black', 'rose']
        },
        cap_style: {
            type: String,
            enum: ['gold_metal', 'silver_metal', 'crystal', 'wood']
        },
        // Gift options
        is_gift: {
            type: String,
            enum: ['yes', 'no']
        },
        gift_box: {
            type: String,
            enum: ['standard', 'premium', 'ultimate']
        },
        ribbon_color: {
            type: String,
            enum: ['gold', 'rose', 'navy', 'burgundy']
        },
        personal_message: {
            type: String,
            enum: ['yes', 'no']
        },
        message_text: String
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'samples_creating', 'samples_sent', 'awaiting_selection', 'completed', 'cancelled'],
        default: 'pending'
    },
    samplesCreated: [{
        name: String,
        notes: String
    }],
    selectedSample: String,
    orderRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    adminNotes: String
}, {
    timestamps: true
});

export default mongoose.models.Customization || mongoose.model('Customization', CustomizationSchema);
