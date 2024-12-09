import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common'
import Stripe from 'stripe'
import { createClerkClient } from '@clerk/express'
import { CreateCheckoutDto } from './dtos/create-checkout.dto'

@Controller('stripe')
export class StripeController {
  @Post('checkout')
  async checkout(@Body() checkoutData: CreateCheckoutDto) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not found')
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-10-28.acacia',
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
      subscription_data: {
        metadata: {
          clerk_user_id: checkoutData.userId,
        },
      },
      line_items: [
        {
          price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
    })
    return { sessionId: session.id }
  }

  @Post('webhook')
  async listTransactions(@Req() request: RawBodyRequest<Request>) {
    const signature = request.headers['stripe-signature']
    if (!signature) {
      throw new Error('Stripe signature not found')
    }
    const text = request.rawBody.toString('utf-8') //await request.text()
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-10-28.acacia',
    })
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    const clerkClient = createClerkClient({
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    })

    switch (event.type) {
      case 'invoice.paid': {
        const { customer, subscription, subscription_details } =
          event.data.object
        const clerkUserId = subscription_details?.metadata?.clerk_user_id
        if (!clerkUserId) {
          throw new Error('Clerk user id not found')
        }
        await clerkClient.users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: customer,
            stripeSubscriptionId: subscription,
          },
          publicMetadata: {
            subscriptionPlan: 'premium',
          },
        })
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.id
        )
        const clerkUserId = subscription.metadata.clerk_user_id
        if (!clerkUserId) {
          throw new Error('Clerk user id not found')
        }
        await clerkClient.users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: null,
            stripeSubscriptionId: null,
          },
          publicMetadata: {
            subscriptionPlan: null,
          },
        })
      }
    }
    return { received: true }
  }
}
