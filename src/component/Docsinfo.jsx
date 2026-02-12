import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useCookies } from "react-cookie";
import { defaultSchoolCode } from "../main";
function Docsinfo() {
  const { user } = useContext(UserContext);
  const [allCookie, setAllCookie] = useCookies(["tokenByAnshCloud"]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  // console.log("allCookie :", allCookie);
  const token = allCookie.tokenByAnshCloud || null;
  const schoolCode = defaultSchoolCode;
  const docsInfo = [
    {
      id: 1,
      docsName: "RES AFFILIATION LETTER 2024-2029 ",
      docsLink: "/view_staff_details",
    },

    {
      id: 2,
      docsName: "SOCIETY REG OF SANCHETNA YOGA FOUNDATION NEW. ",
      docsLink: "",
    },
    { id: 3, docsName: "RES NOC", docsLink: "" },
    { id: 4, docsName: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009", docsLink: "" },
    { id: 5, docsName: "BUILDING SAFETY CERTIFICATE ", docsLink: "" },
    { id: 6, docsName: "FIRE SERVICE UTTAR PRADESH", docsLink: "" },
    { id: 7, docsName: "Self-Certification", docsLink: "" },
    { id: 8, docsName: "Water and Sanitation Certificates", docsLink: "" },
    {
      id: 9,
      docsName:
        "Water sample test report from Public Health Engineer Department",
      docsLink: "",
    },
    {
      id: 10,
      docsName: "Sanitation Certificate from Public Health Engineer Department",
      docsLink: "",
    },
    {
      id: 11,
      docsName: "Mandatory Disclosure Details SARAS 4.0",
      docsLink: "",
    },
  ];

  async function handleGetDoc(docsName) {
    setIsError(false);

    try {
      const response = await axios.post(
        `/view_doc`,
        {
          documentType: docsName.split(" ").join("_"),
          schoolCode: schoolCode,
        },
        { responseType: "blob" }
      );

      console.log("docType :", docsName.split(" ").join("_"));

      // Assuming the response data is a PDF Blob
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      console.log(pdfBlob);
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(pdfUrl);
    } catch (error) {
      setError(error);
      if (error.response.status === 404) {
        setError("Document not found");
      }
      setIsError(true);

      setError(error);

      alert("Document not found");
    }
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (docsName) => {
    const documentType = docsName.split(" ").join("_");

    const formData = new FormData();
    formData.append("file", selectedFile);
    // Append schoolCode and docType
    formData.append("schoolCode", schoolCode);
    formData.append("documentType", documentType);

    console.log("formData :", formData);
    // Assuming you have a bearer token, replace 'YOUR_BEARER_TOKEN' with your actual token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios
      .post(`/upload_doc/${schoolCode}/${documentType}`, formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status == 413) {
          alert("file size should be less than 2mb");
        }
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center px-4">
      <table
        id=""
        className=" border-collapse justify-center w-4/5 shadow-lg bg-white"
      >
        {window.innerWidth < 768 && (
          <thead>
            <tr>
              <th
                colSpan="5"
                className="px-4 py-3 bg-red-500 text-white text-center"
              >
                DOCUMENTS & INFORMATION
              </th>
            </tr>
          </thead>
        )}
        {window.innerWidth > 768 && (
          <thead>
            <tr>
              <th
                colSpan="5"
                className="px-4 py-3 bg-red-500 text-white text-center"
              >
                DOCUMENTS & INFORMATION
              </th>
            </tr>
          </thead>
        )}

        <tbody className="">
          {docsInfo.map((data) => (
            <tr
              key={data.id}
              className="transition-transform ease-in-out duration-300 even:bg-gray-200 hover:bg-gray-100 hover:scale-95 "
            >
              <td className="px-4 py-2 animate-fadeIn">{data.id}</td>
              <td className="px-4 py-2 animate-fadeIn">
                {data.docsName.toUpperCase()}
              </td>
              <td className="px-4 py-2 animate-fadeIn">
                <button
                  onClick={() => handleGetDoc(data.docsName)}
                  className="bg-red-500 text-white px-4 py-2 whitespace-nowrap rounded hover:bg-custom-blue"
                >
                  View / Download
                </button>
              </td>
              {user && (
                <td className="px-4 py-2 animate-fadeIn">
                  <input
                    type="file"
                    name="upload"
                    accept="application/pdf,application/vnd.ms-excel"
                    onChange={handleFileUpload}
                    className="mb-2"
                  />
                  <button
                    onClick={() => handleUpload(data.docsName)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-custom-blue"
                  >
                    Upload
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Docsinfo;
