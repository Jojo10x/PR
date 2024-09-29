import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productImage: string;
  productName: string;
  productDetails: string[];
  modelsSizes: string[];
}

const ProductSchema: Schema = new Schema({
  productImage: { type: String, required: true },
  productName: { type: String, required: true },
  productDetails: { type: [String], required: true },
  modelsSizes: { type: [String], required: true }
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
