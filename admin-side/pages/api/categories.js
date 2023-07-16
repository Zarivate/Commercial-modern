import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;

  // Attempt to connect to the database if not connected
  await mongooseConnect();

  // If it's a POST request, attempt to make a document on the backend from the data
  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const categoryDoc = await Category.create({
      name,
      // This is to shorthand it later on when it's being handled by the Category model
      parent: parentCategory || null,
    });
    res.json(categoryDoc);
  }

  // If the method is GET, then retrieve all the categories
  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  // If the method is a PUT request, just update the already existing data
  if (method == "PUT") {
    const { name, parentCategory, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        // This is to shorthand it later on when it's being handled by the Category model
        parent: parentCategory || null,
      }
    );
    res.json(categoryDoc);
  }

  // Method to handle deletion
  if (method === "DELETE") {
    // Grab the category id from the passed in request url
    const { _id } = req.query;
    // Then delete this specific product
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
