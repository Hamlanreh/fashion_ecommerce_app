'use client';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react'; 
import { useAuthContext } from '@context/AuthProvider';
import { useCartContext } from '@context/CartProvider';
import { useOrderContext } from '@context/OrderProvider';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";


export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuthContext();
  const { items, total } = useCartContext();
  const { createOrder } = useOrderContext();

  const stripe = useStripe();
  const elements = useElements();

  
  useEffect(() => {
    if (!stripe) { return; }
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) { return; }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case "succeeded": setMessage("Payment succeeded!");
            break;
          case "processing": setMessage("Your payment is processing.");
            break;
          case "requires_payment_method": setMessage("Your payment was not successful, please try again.");
            break;
          default: setMessage("Something went wrong.");
            break;
        }
    });
  }, [stripe]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) { return; }
    setIsLoading(true);

    createOrder({ 
      items: items.map((item: any) => ({ product: item._id, quantity: item.quantity })), 
      user: user._id, 
      status: "paid",
      total,
    })   

    const { error }: any = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "/orders" },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }    

     

    setIsLoading(false);
  };

  const paymentElementOptions: any = { layout: "tabs" };


  return (
    <form id="payment-form" className="w-3/4" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <button 
            disabled={isLoading || !stripe || !elements} 
            id="submit"
            className="bg-orange-400 text-white py-3 px-10 rounded-sm my-8"
        >
            <span id="button-text">{isLoading ? 
            (<div className="spinner" id="spinner">
                <Image 
                    className="spinner" 
                    src="/images/icons/spinner_icon.svg" 
                    alt="spinner" 
                    width="100" 
                    height="100" 
                />
            </div>) : "Pay now"}</span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
    </form>
  )
};
