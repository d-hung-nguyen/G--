import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

// export default async function handler(request, response) {
//   await dbConnect();
//   const { id } = request.query;

//   if (request.method === "GET") {
//     const product = await Product.findById(id).populate("reviews");

//     if (!product) {
//       return response.status(404).json({ status: "Not Found" });
//     }

//     response.status(200).json(product);
//   }
// }

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedProduct = await Product.deleteOne({ _id: id });
        if (!deletedProduct) {
          res.status(204).json({ success: true, data: {} });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
