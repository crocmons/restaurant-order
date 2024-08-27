import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import  {headers} from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req:Request){
  const body = await req.text()
  const signature = headers().get('stripe-signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!
    )
    console.log('event', event)
  } catch (error) {
    return new NextResponse("invalid signature", {status:400})
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log('session', session)

  if (event.type === 'checkout.session.completed'){
    console.log('Payment was successful for user')
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    console.log('subscription',subscription)
  }

  return new NextResponse('ok', {status:200})

}