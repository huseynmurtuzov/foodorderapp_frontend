import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function PaymentOptions({setIsCreditCard,setisCreditCardValid}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const cardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  const expireDateRegex = /^(0[1-9]|1[0-2])\/(2[4-9]|[3-9][0-9])$/;
  const cvvRegex = /^[0-9]{3,4}$/;

  
  useEffect(() => {
    if (
        cardRegex.test(cardDetails.cardNumber) &&
        expireDateRegex.test(cardDetails.expiry) &&
        cvvRegex.test(cardDetails.cvv) &&
        paymentMethod === "credit"
    ) {
        setisCreditCardValid(true);
        console.log("Credit card is valid");
    } else {
        setisCreditCardValid(false);
    }
}, [cardDetails.cardNumber, cardDetails.expiry, cardDetails.cvv, paymentMethod]);


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
            onClick={() => setIsCreditCard(false)}
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
            onClick={() => setIsCreditCard(true)}
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
