// pages/api/products/index.js
import dbConnect from "../../../db/connect";
import Products from "../../../db/models/Products";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  } else {
    // Handle other methods or return 405 Method Not Allowed
  }
}
