// File that holds the model schema for the backend Mongo database

import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: { type: Object },
});

// Create the actual model, follows pattern of model('name of model', Schema )
// If a Product model already exists within models then use that, else create it
export const Product = models.Product || model("Product", ProductSchema);