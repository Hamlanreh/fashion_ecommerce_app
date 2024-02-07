import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: any) => {
  const itemPrices = items.map((item: any) => item.price * item.quantity);
  const totalAmount = itemPrices.reduce((prev: number, next: number) => { return prev + next }, 0);
  return totalAmount * 100;
};

export async function POST (req: NextRequest) {
  try {
    const items = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: { enabled: true }
    });
      
    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });

  } catch(err) {
    return NextResponse.json({ error: err, message: 'Payment Intent Failure!' }, { status: 400 });
  }
};