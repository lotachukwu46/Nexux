import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../../styles/signupComponentStyles/paymentInfo.scss";
import master from "../../../../public/master.png";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    line1: "",
    line2: "",
    suburb: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardholderName,
          email: email,
          address: billingAddress,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      } else {
        console.log("PaymentMethod ID:", paymentMethod.id);
        // Call your backend to handle the payment with the paymentMethod.id
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const handleBillingAddressChange = (event) => {
    const { name, value } = event.target;
    setBillingAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  return (
    <form className="checkout-form" onSubmit={handlePayment}>
      <h2>Payment Information</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Card Information</label>
        <div className="card-icons">
          <img src="/client/public/visa.png" alt="Visa" />
          <img src="" alt="MasterCard" />
          <img src="amex-icon.png" alt="American Express" />
        </div>
        <CardElement />
      </div>
      <div className="form-group">
        <label>Cardholder Name</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Billing Address</label>
        <input
          type="text"
          name="line1"
          placeholder="Address line 1"
          value={billingAddress.line1}
          onChange={handleBillingAddressChange}
          required
        />
        <input
          type="text"
          name="line2"
          placeholder="Address line 2"
          value={billingAddress.line2}
          onChange={handleBillingAddressChange}
        />
        <input
          type="text"
          name="suburb"
          placeholder="Suburb"
          value={billingAddress.suburb}
          onChange={handleBillingAddressChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={billingAddress.city}
          onChange={handleBillingAddressChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={billingAddress.state}
          onChange={handleBillingAddressChange}
          required
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={billingAddress.postal_code}
          onChange={handleBillingAddressChange}
          required
        />
        <select
          name="country"
          value={billingAddress.country}
          onChange={handleBillingAddressChange}
          required
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="IN">India</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
