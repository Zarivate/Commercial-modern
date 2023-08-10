import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handler(req, res) {
  // This endpoint only accepts POST requests so make sure it is one before doing anything else,
  if (req.method !== "POST") {
    res.json("Not a POST request, error");
    return;
  }

  // Otherwise, grab the elemnents passed in through the req
  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;

  // Attempt to connect to the database
  await mongooseConnect();

  // Since the products array was passed in while being joined through commas,
  // can split them up at each comma to get every id.
  const productIds = products.split(",");

  // In order to get all the unique Ids, a set converted to an array is made from the collected productIds
  const uniqueIds = [...new Set(productIds)];

  // Grab the data of every product in the database where the product _id matches with the unique ones collected above
  const productInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (p) => p._id.toString() === productId
    );
    // Calculate the quantity of each item by filtering the length of the number of times the id shows up in products
    const quantity = productIds.filter((id) => id === productId)?.length || 0;

    // So long as their is at least 1 of the product and it's info exists, push the data to line_items
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }

  res.json(line_items);
}
