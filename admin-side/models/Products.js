// File that holds the model schema for the backend Mongo database

import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

// Create the actual model, follows pattern of model('name of model', Schema )
export const Product = model("Product", ProductSchema);
