import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useCookies } from "react-cookie";

function Tc() {
  const [error, setError] = useState(null); // error handling
  const [transcriptNo, setTranscriptNo] = useState(null);
  const [issueDate, setIssueDate] = useState(null);
  const { user } = useContext(UserContext);
  const [allCookie, setAllCookie] = useCookies(["tokenByAnshCloud"]);
  // console.log("allCookie :", allCookie);
  const token = allCookie.tokenByAnshCloud || null;

  console.log("transcriptNo :", transcriptNo);
  console.log("issueDate :", issueDate);
  const handleTCChange = (e) => {
    setTranscriptNo(e.target.value);
  };

  const handleIssueDateChange = (e) => {
    setIssueDate(e.target.value);
  };

  const schoolCode = "2131082";
  const handleGetTC = async () => {
    setError(null);

    try {
      if (!transcriptNo || !issueDate) {
        setError("Please enter Transcript No. and Issue Date");
        return;
      }

      const response = await axios.post(
        `/view_transcript`,
        {
          transcriptNumber: transcriptNo,
          schoolCode: schoolCode,
          issuedDate: issueDate,
        },
        { responseType: "blob" }
      );

      console.log("transcriptNo :", transcriptNo);

      // Assuming the response data is a PDF Blob
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      console.log(pdfBlob);
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(pdfUrl);
    } catch (error) {
      console.log(error);

      setError("Please Enter Correct Details.");
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleUpload() {
    try {
      if (!transcriptNo || !issueDate) {
        setError("Please enter Transcript No. and Issue Date");
        return;
      }

      setError(null);
      const formData = new FormData();
      console.log(formData);
      formData.append("file", selectedFile);
      // Append schoolCode and docType
      formData.append("schoolCode", schoolCode);
      formData.append("transcriptNumber", transcriptNo);
      formData.append("issuedDate", issueDate);
      // Assuming you have a bearer token, replace 'YOUR_BEARER_TOKEN' with your actual token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = axios
        .post(`/upload_transcript/`, formData, config)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            alert("File uploaded successfully");
          }
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div className="m-10 pt-[120px] ">
      <h2 className="text-2xl font-semibold text-[#343A78] border-b-2 border-red-500 inline-block">
        Transfer Certificate
      </h2>
      <br></br>

      {user && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="border border-black rounded p-6"
          />
          <button className="bg-blue-700 p-3" onClick={() => handleUpload()}>
            Upload
          </button>
        </div>
      )}
      <div className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-evenly">
        {/* transcript no. */}
        <div className="flex items-center justify-center gap-4">
          <label htmlFor="transcriptNo" className="text-sm p-2 text-[#343A78] ">
            Transcript Number
          </label>
          <input
            type="text"
            id="transcriptNo"
            className="p-2 sm:rounded"
            onChange={handleTCChange}
          />
        </div>

        {/* issue date */}
        <div className="flex items-center justify-center gap-4">
          <label className="text-sm p-2 text-[#343A78] " htmlFor="issueDate">
            Issued Date
          </label>
          <input
            type="date"
            id="issueDate"
            className="p-2 sm:rounded"
            onChange={handleIssueDateChange}
          />
        </div>

        {/* search button */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleGetTC()}
            className="p-3 rounded bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] bg-red-500 "
          >
            <FontAwesomeIcon icon={faSearch} className="mr-2 text-white" />{" "}
            <span className="text-white">Search&nbsp;</span>
          </button>
        </div>
      </div>
      <div></div>
      <div>{error && <p className="text-red-500 pt-2 px-2">{error}</p>}</div>
    </div>
  );
}
export default Tc;
