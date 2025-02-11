'use server';

import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config';
import { createClerkSupabaseClientSsr } from '@/utils/supabase/server';
import { createOrRetrieveCustomer, supabaseAdmin } from '@/utils/supabase/admin';
import {
    getURL,
    getErrorRedirect,
    calculateTrialEndUnixTimestamp
} from '@/utils/helpers';
import { Tables } from '@/types/database.types';
import { auth, currentUser } from '@clerk/nextjs/server';

type Price = Tables<'prices'>;

export async function checkoutWithStripe(
    price: Price,
    redirectPath: string = '/',
    referralId?: string,
    referral?: string
) {
    try {
        // Get the user from Supabase auth
        const user = await currentUser()

        if (referralId) {
            console.log("checkout with referral id:", referralId)
        }

        if (!user) {
            throw new Error('Could not get user session.');
        }

        // Retrieve or create the customer in Stripe
        let customer: string;
        try {
            customer = await createOrRetrieveCustomer({
                uuid: user.id || '',
                email: user?.primaryEmailAddress?.emailAddress || '',
                referral: referralId
            });
        } catch (err) {
            console.error(err);
            throw new Error('Unable to access customer record.');
        }

        const referralMetadata = referral || referralId ? {
            metadata: {
                referral: referral || null,
                referral_id: referralId || null
            }
        } : {}

        let params: Stripe.Checkout.SessionCreateParams = {
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            customer,
            customer_update: {
                address: 'auto'
            },
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                }
            ],
            cancel_url: getURL(),
            success_url: getURL(redirectPath),
            client_reference_id: referralId,
            ...referralMetadata
        };

        if (price.type === 'recurring') {
            params = {
                ...params,
                mode: 'subscription',
                subscription_data: {
                    trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days),
                    ...referralMetadata
                }
            };
        } else if (price.type === 'one_time') {
            params = {
                ...params,
                mode: 'payment'
            };
        }

        // Create a checkout session in Stripe
        let session: Stripe.Checkout.Session
        try {
            session = await stripe.checkout.sessions.create(params);
        } catch (err) {
            console.error(err);
            throw new Error('Unable to create checkout session.');
        }

        // Instead of returning a Response, just return the data or error.
        if (session) {
            return session
        } else {
            throw new Error('Unable to create checkout session.');
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    error.message,
                    'Please try again later or contact a system administrator.'
                )
            };
        } else {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    'An unknown error occurred.',
                    'Please try again later or contact a system administrator.'
                )
            };
        }
    }
}

export async function createStripePortal(currentPath: string) {
    try {
        const supabase = await createClerkSupabaseClientSsr();
        const {
            error,
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
            if (error) {
                console.error(error);
            }
            throw new Error('Could not get user session.');
        }

        let customer;
        try {
            customer = await createOrRetrieveCustomer({
                uuid: user.id || '',
                email: user.email || ''
            });
        } catch (err) {
            console.error(err);
            throw new Error('Unable to access customer record.');
        }

        if (!customer) {
            throw new Error('Could not get customer.');
        }

        try {
            const { url } = await stripe.billingPortal.sessions.create({
                customer,
                return_url: getURL('/account')
            });
            if (!url) {
                throw new Error('Could not create billing portal');
            }
            return url;
        } catch (err) {
            console.error(err);
            throw new Error('Could not create billing portal');
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return getErrorRedirect(
                currentPath,
                error.message,
                'Please try again later or contact a system administrator.'
            );
        } else {
            return getErrorRedirect(
                currentPath,
                'An unknown error occurred.',
                'Please try again later or contact a system administrator.'
            );
        }
    }
}


export async function createBillingPortalSession() {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("No User")
        }

        const { data: customer, error } = await supabaseAdmin.from("customers").select("*").eq("id", user.id).maybeSingle()

        if (error) {
            throw error
        }

        // Create a billing portal session
        const session = await stripe.billingPortal.sessions.create({
            customer: customer?.stripe_customer_id!,
            return_url: getURL('/settings'), // URL to redirect after the session
        });

        // Return the session URL
        return session.url;
    } catch (error) {
        console.error('Error creating billing portal session:', error);
        return {
            error: "Error creating billing portal session"
        }
    }
}