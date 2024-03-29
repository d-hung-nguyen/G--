import dbConnect from "@/db/connect";
import product from "@/db/models/product";

export default function handler(request, response) {
  const { id } = request.query;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return response.status(404).json({ status: "Not Found" });
  }

  response.status(200).json(product);
}
