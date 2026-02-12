import { defaultSchoolCode } from "../main";
import { steps } from "../pages/admRegForm/testing";

let BASE_URL = import.meta.env.VITE_BACKEND_URL;

if(import.meta.env.VITE_ENV_MODE === 'development'){
  BASE_URL = import.meta.env.VITE_LOCALHOST
}

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function showRazorpay({
  id,
  student_email,
  student_name,
  setCurrentStep,
}) {
  try {
    if (!id || !student_email || !student_name) {
      alert(
        `id = ${id}, student_email = ${student_email}, student_name = ${student_name}`
      );
      return;
    }
    console.log("show razorpay func called");

    console.log("here");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log("result from checkout ....................", res);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const body = {
      id: id,
      student_email: student_email,
      student_name: student_name,
      schoolCode: defaultSchoolCode,
    };
    const fetchData = await fetch(
      `${BASE_URL}/get-form/${id}/create_order`,
      // `http://localhost:3002/get-form/${id}/create_order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log(
      "DATA === === === == == == == == === = == = = === = = = = == = = = = = = = == = = = =",
      fetchData
    );
    let data = await fetchData.json();

    const options = {
      key: "rzp_live_Y99IaBl7TusbYN",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Admission",
      description: "",

      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log("here1 is handler respone", response);

        await fetch(
          `${BASE_URL}/get-form/${id}/verification`,
          // `http://localhost:3002/get-form/${id}/verification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "x-razorpay-signature": response.razorpay_signature,
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              amount: response.razorpay_amount,
              email: student_email,
              name: student_name,
              schoolCode: defaultSchoolCode,
            }),
          }
        ).then((t) => {
          console.log("here2", t);
          setCurrentStep(steps.finalStep);
        });

        // alert("Transaction successful");
        window.location.reload();
      },
      prefill: {
        name: "gmail",
        email: "gmail@gmail.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    alert("Payment failed");
    throw new Error(error);
  }
}
