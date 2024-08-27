"use client"
import {loadStripe} from "@stripe/stripe-js"
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from "@stripe/react-stripe-js"

import { useCallback, useRef, useState } from "react"


export default function EmbeddedCheckoutButton(){
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    )
    const [showCheckout, setShowCheckout] = useState(false)

    const modelRef = useRef<HTMLDialogElement>(null)

    const handleCheckoutClick = ()=>{
        setShowCheckout(true)
        modelRef.current?.showModal()
    }
    const handleClose = ()=>{
        setShowCheckout(false)
        modelRef.current?.close()
    }

    const fetchClientSecret = useCallback(()=>{
        return fetch('/api/checkout',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({priceId:"price_1PpYNZSCP2vwnOL1ohizcLvJ"})
        })
         .then((res)=>res.json())
         .then((data)=>data.client_secret)
    },[])

    const options = {fetchClientSecret}

    return(
        <div id='checkout'>
            <button onClick={handleCheckoutClick}>
                Open Modal with checkout
            </button>
            <dialog ref={modelRef}>
                <div>
                    <h3>Stripe Checkout</h3>
                    <div>
                        {
                            showCheckout && (
                                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                                   <EmbeddedCheckout />
                                </EmbeddedCheckoutProvider>
                            )
                        }
                    </div>
                    <div>
                        <form method="dialog">
                            <button onClick={handleClose}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}