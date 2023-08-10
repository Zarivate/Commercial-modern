import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handle(req, res) {
  await mongooseConnect();

  const ids = req.body.ids;

  // Find any products where the id matches up with those of ids/the ids sent in the request
  res.json(await Product.find({ _id: ids }));
}
