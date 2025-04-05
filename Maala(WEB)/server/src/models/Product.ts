import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  specifications: Record<string, string>;
  ratings: {
    average: number;
    count: number;
  };
  reviews: Array<{
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  priceHistory: Array<{
    price: number;
    timestamp: Date;
  }>;
  stock: number;
  seller: {
    name: string;
    rating: number;
    location: string;
  };
  url: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    images: [{
      type: String,
      required: true,
    }],
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    reviews: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    priceHistory: [{
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    seller: {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      location: {
        type: String,
        required: true,
      },
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for text search
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

// Index for price range queries
productSchema.index({ price: 1 });

// Index for category queries
productSchema.index({ category: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema); 