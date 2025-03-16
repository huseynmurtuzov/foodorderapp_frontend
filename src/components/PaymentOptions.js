import { useState } from "react";

export default function PaymentOptions() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="payment-container">
      <h3 className="payment-title">Payment Method</h3>

      <div className="payment-options">
        <label className={`payment-option ${paymentMethod === "cash" ? "active" : ""}`}>
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          Cash
        </label>

        <label className={`payment-option ${paymentMethod === "credit" ? "active" : ""}`}>
          <input
            type="radio"
            name="payment"
            value="credit"
            checked={paymentMethod === "credit"}
            onChange={() => setPaymentMethod("credit")}
          />
          Credit Card
        </label>
      </div>

      {paymentMethod === "credit" && (
        <div className="card-details">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleCardChange}
          />
          <div className="card-row">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={handleCardChange}
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleCardChange}
            />
          </div>
        </div>
      )}

      {/* <button className="order-btn">Confirm Payment</button> */}
    </div>
  );
}
