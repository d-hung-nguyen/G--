import db
import products from "@/db/models/products";

export default function handler(request, response) {
  return response.status(200).json(products);
}
