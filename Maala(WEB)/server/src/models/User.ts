import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  savedProducts: string[];
  priceAlerts: Array<{
    productId: string;
    targetPrice: number;
    createdAt: Date;
  }>;
  chatHistory: Array<{
    sessionId: string;
    productId: string;
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: Date;
    }>;
    status: 'active' | 'completed' | 'cancelled';
    finalPrice?: number;
    createdAt: Date;
    updatedAt: Date;
  }>;
  voiceChatHistory: Array<{
    sessionId: string;
    productId: string;
    duration: number;
    status: 'active' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
  }>;
  searchHistory: Array<{
    query: string;
    timestamp: Date;
  }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    savedProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
    priceAlerts: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      targetPrice: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    chatHistory: [{
      sessionId: {
        type: String,
        required: true,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      messages: [{
        role: {
          type: String,
          enum: ['user', 'assistant'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      }],
      status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
      },
      finalPrice: {
        type: Number,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    voiceChatHistory: [{
      sessionId: {
        type: String,
        required: true,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      duration: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    searchHistory: [{
      query: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model<IUser>('User', userSchema); 