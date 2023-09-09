import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            pattern: '^[a-zA-Z0-9_]*$',
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        phone: {
            type: String,
            pattern: '^[0-9]*$',
            default: '',
        },
        shippingInfo: {
            address: {
                type: String,
                pattern: '^[a-zA-Z]*$',
                default: '',
            },
            apartment: {
                type: String,
                pattern: '^[a-zA-Z]*$',
                default: '',
            },
            city: {
                type: String,
                pattern: '^[a-zA-Z]*$',
                default: '',
            },
            state: {
                type: String,
                pattern: '^[a-zA-Z]*$',
                default: '',
            },
            country: {
                type: String,
                pattern: '^[a-zA-Z]*$',
                default: '',
            },
            postalCode: {
                type: String,
                pattern: '^[0-9]*$',
                default: '',
            },
        },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        // if the password is not modified, then do not hash it again
        next();
    }

    const salt = await bcrypt.genSalt(10); // 10 rounds of encryption
    this.password = await bcrypt.hash(this.password, salt); // hash the password with salt value
});

const User = mongoose.model('User', userSchema);

export default User;
