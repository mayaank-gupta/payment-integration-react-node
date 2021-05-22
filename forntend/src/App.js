/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from './logo.svg';
import './App.css';

let razorKey = {};

function loadRazorPay() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    }

  })
}

if (document.domain === "localhost") {
  razorKey = process.env.RAZORPAYKEY;
} else {
  razorKey = process.env.PROD_RAZORPAYKEY;
}

function App() {

  async function showRazorPay() {

    const res = await loadRazorPay();

    if (!res) {
      alert("Failed to load!");
      return;
    }

    const razorpayData = await fetch("http://localhost:3005/razorpay", {
      method: "POST"
    }).then((res) => res.json());

    console.log(razorpayData)

    var options = {
      "key": razorKey,
      "name": "MegaMart Retails",
      "description": "Thank you fro shopping with us!",
      "image": "https://example.com/your_logo",
      "order_id": razorpayData.id,
      "currency": razorpayData.currency,
      "amount": razorpayData.amount,
      "reciept_id": razorpayData.reciept_id,
      "handler": function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
      }
    };
    var paymentObj = new window.Razorpay(options);
    paymentObj.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={showRazorPay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Razorpay Integration
        </a>
      </header>
    </div>
  );
}

export default App;
