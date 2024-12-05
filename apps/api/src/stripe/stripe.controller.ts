import { Body, Controller, Headers, Post } from '@nestjs/common'
import Stripe from 'stripe'
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
}
