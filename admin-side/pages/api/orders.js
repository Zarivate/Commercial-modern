import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

// Function that handles retrieval of any and all orders made
export default async function handler(req, res) {
  // Connect to database first
  await mongooseConnect();

  // Return all the orders in ascending order by the time they were placed
  res.json(await Order.find().sort({ createdAt: -1 }));
}
