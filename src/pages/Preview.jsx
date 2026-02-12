import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
// import Payment from "../component/Payment.js";
import { useNavigate } from "react-router-dom";

function Preview() {
  const [myCookie, setMyCookie] = useCookies("submitID");
  const submitID = myCookie.submitID;
  console.log("MY COOKIE : ", myCookie);
  const navigate = useNavigate();
  // const submitID = 6;
  const email = useRef("");
  const name = useRef("");
  const schoolCode = useRef("");
  console.log("email : ", email);
  console.log("name : ", name);

  const [formData, setFormData] = useState({});
  console.log("formdata : ", formData);

  let PaymentStatus;

  useEffect(() => {
    async function getForm() {
      try {
        const [response] = (await axios.get(`/get-form/${submitID}`)).data;
        const asArray = Object.entries(response);
        console.log("asArray ", asArray);
        console.log("response : ", response);

        const res = asArray.reduce((obj, [key, value]) => {
          if (value !== "NA") {
            obj[key] = value;
          }
          return obj;
        }, {});
        console.log("res", res);
        // Assuming the response.data is an object with key-value pairs
        setFormData(res);
        email.current = response.data[0].EMAIL;
        name.current = response.data[0].NAME;
        schoolCode.current = response.data[0].SCHOOLCODE;
        console.log("PaymentStatus : ", formData.paymentStatus);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    }

    getForm();
  }, [submitID]);

  return (
    <div className="m-10">
      <h2 className="text-center text-xl font-bold">Form Preview</h2>
      <ul>
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center my-4">
        {formData.paymentStatus === "SUCCESS" ? (
          <h1 className="bg-green-600 text-white p-3 rounded">
            Payment Successful
          </h1>
        ) : (
          <button className="bg-blue-600 p-3 text-white rounded ">
            {/* <Payment
              id={submitID}
              student_email={email.current}
              student_name={name.current}
              schoolCode={schoolCode.current}
            /> */}
          </button>
          // {/* <button onClick={()=>navigate("/qr")} className="bg-blue-600 p-3 text-white rounded ">Pay via Qr Code</button> */}
        )}
      </div>
    </div>
  );
}
export default Preview;
