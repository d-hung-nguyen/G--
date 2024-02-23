import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", //
    },
  ],
});

// Compile the model from the schema
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name.
// If a model with the same name already exists, it will not be overwritten, preventing recompilation errors in development mode.
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
