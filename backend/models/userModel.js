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
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePic: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    },
    firstName: {
      type: String,
      pattern: '^[a-zA-Z]*$',
      default: '',
    },
    lastName: {
      type: String,
      pattern: '^[a-zA-Z]*$',
      default: '',
    },
    phone: {
      type: String,
      pattern: '^[0-9]*$',
      default: '',
    },
    shippingInfo: {
      number: {
        type: String,
        pattern: '^[a-zA-Z0-9/-]*$',
        default: '',
      },
      line1: {
        type: String,
        pattern: '^[a-zA-Z]*$',
        default: '',
      },
      line2: {
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
      zip: {
        type: String,
        pattern: '^[0-9]*$',
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
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
