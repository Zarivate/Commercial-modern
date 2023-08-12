import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";

const stripe = require("stripe")(process.env.STRIPE_SK);

const endpointSecret =
  "whsec_44521c2d612425844337ace27d302dc6307b7e26ccb43bd1928c621dfc2dd322";

// Endpoint to handle checking whether payments were already maid or not so don't have to manually check each order
export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentData = event.data.object;
      const orderId = paymentData.metadata.orderId;
      const paid = paymentData.payment_status === "paid";
      console.log(paymentData);

      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

// Because the entire body needs to be passed through and Next.js parses request bodies by default, the feature is set to false
// in order to avoid the issue.
export const config = {
  api: { bodyParser: false },
};
