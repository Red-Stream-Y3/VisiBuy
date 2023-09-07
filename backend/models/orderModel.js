import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                    default: '',
                },
                price: {
                    type: Number,
                    required: true,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],
        shippingDetails: {
            name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            apartment: {
                type: String,
                required: false,
            },
            state: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
        shippingMethod: {
            type: String,
            required: true,
            default: 'Cash on Delivery',
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isConfirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        confirmedAt: {
            type: Date,
        },
        isRejected: {
            type: Boolean,
            required: true,
            default: false,
        },
        rejectedAt: {
            type: Date,
        },
        rejectReason: {
            type: String,
            required: false,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        isShipped: {
            type: Boolean,
            required: true,
            default: false,
        },
        shippedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
