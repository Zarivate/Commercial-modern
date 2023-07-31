import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { isAuthorized } from "./auth/[...nextauth]";

// File that handles any API calls to api/products, mainly for when a user wants to create a new product for now
export default async function productMake(req, res) {
  // Get the tpe of request method sent
  const { method } = req;

  // Attempt to connect to the database
  await mongooseConnect();

  await isAuthorized(req, res);

  // If the method is a POST request, then create a product from the data
  if (method === "POST") {
    // Get the data fields from the payload
    const { title, description, price, images, category, properties } =
      req.body;

    // Attempt to create a product from the passed in data fields and store it within a productDoc variable
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    // Return the created productDoc variable
    res.json(productDoc);
  }

  // Method to handle GET requests
  if (method === "GET") {
    // Check to see if a product id parameter was passed in the request
    if (req.query?.id) {
      // If so then return that specific product's information in json format
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      // If can't find it then just return all the products
      res.json(await Product.find());
    }
  }

  // Method to handle PUT requests, will update existing product info
  if (method === "PUT") {
    // Grab the passed in data fields from the request body
    const { title, description, price, images, category, _id, properties } =
      req.body;

    // Update one specific product using it's id to identify it. Goes by the pattern of {object}, followed by the fileds you want to update.
    // Note: should technically be {_id:_id} and {title:title, description:description, price:price} but have same name so can shorthand it
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    res.json(true);
  }

  // Method to handle deletion of a post
  if (method === "DELETE") {
    // If there exists a product id within the request query parameters
    if (req.query?.id) {
      // Then delete this specific product
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
