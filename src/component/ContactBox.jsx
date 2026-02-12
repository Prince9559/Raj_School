import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import UserContext from "../context/UserContext";
import { defaultSchoolCode } from "../main";

export default function ContactBox() {
  const [infoTable, setInfoTable] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState({
    purpose: "",
    mobNumber: "",
    officer: "",
  });

  const [allCookie, setAllCookie] = useCookies(["tokenByAnshCloud"]);
  // console.log("allCookie :", allCookie);
  const token = allCookie.tokenByAnshCloud || null;

  useEffect(() => {
    async function getData() {
      const data = await axios
        .post("/get_contact", {
          schoolCode: defaultSchoolCode,
        })
        .then((res) => res.data);
      setInfoTable(data);
    }
    getData();
  }, []);

  const { user } = useContext(UserContext);

  const handleEditClick = (id, purpose, mobNumber, officer) => {
    setIsEditing(true);
    setEditedField({ id, purpose, mobNumber, officer });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedField((prevField) => ({
      ...prevField,
      [name]: value,
    }));
  };

  const handleSaveClick = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    setIsEditing(false);
    // Make API call to update data
    const response = await axios.post(
      "/update_contact_us",
      {
        schoolCode: defaultSchoolCode,
        purpose: editedField.purpose,
        mobNumber: editedField.mobNumber,
        officer: editedField.officer,
        id: id,
      },
      config
    );
    console.log(response);
    if (response.status === 200) {
      console.log("Data updated successfully");
      alert("Data updated successfully");
    }
    // Update local state after successful save
    const updatedTable = infoTable.map((data) => {
      if (data.purpose === editedField.purpose) {
        return {
          ...data,
          purpose: editedField.purpose,
          mobNumber: editedField.mobNumber,
          officer: editedField.officer,
        };
      }
      return data;
    });
    setInfoTable(updatedTable);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center overflow-x-auto">
      <table
        id=""
        className="border-collapse justify-center  md:w-4/5 shadow-lg bg-white"
      >
        <thead className="text-center">
          <tr>
            <th className="px-2 sm:px-4 py-2 bg-red-500 text-white text-left text-xs sm:text-sm md:text-base">
              Purpose
            </th>
            <th className="px-2 sm:px-4 py-2 bg-red-500 text-white text-left text-xs sm:text-sm md:text-base">
              Mobile No.
            </th>
            <th className="px-2 sm:px-4 py-2 bg-red-500 text-white text-left text-xs sm:text-sm md:text-base">
              Officer
            </th>
            {user && (
              <th className="px-2 sm:px-4 py-2 bg-red-500 text-white text-left text-xs sm:text-sm md:text-base">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {infoTable.map((data) => (
            <tr
              key={data.id}
              className="transition-transform ease-in-out duration-300 even:bg-gray-200 hover:bg-gray-100 hover:scale-95"
            >
              <td className="px-2 py-2 animate-fadeIn text-xs sm:text-sm md:text-base">
                {isEditing && editedField.id === data.id ? (
                  <input
                    type="text"
                    name="purpose"
                    value={editedField.purpose}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  data.purpose
                )}
              </td>
              <td className="px-2 py-2 animate-fadeIn text-xs sm:text-sm md:text-base">
                {isEditing && editedField.id === data.id ? (
                  <input
                    type="text"
                    name="mobNumber"
                    value={editedField.mobNumber}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  data.mobNumber
                )}
              </td>
              <td className="px-2 py-2 animate-fadeIn text-xs sm:text-sm md:text-base">
                {isEditing && editedField.id === data.id ? (
                  <input
                    type="text"
                    name="officer"
                    value={editedField.officer}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  data.officer
                )}
              </td>
              {user && (
                <td className="px-2 py-2 animate-fadeIn text-xs sm:text-sm md:text-base">
                  {isEditing ? (
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => handleSaveClick(data.id)}
                        type="button"
                        className="flex justify-center items-center h-[2.875rem] w-[2.875rem] text-xs sm:text-sm md:text-base font-bold rounded-lg hover:stroke-white bg-green-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        type="button"
                        className="flex justify-center items-center h-[2.875rem] w-[2.875rem] text-xs sm:text-sm md:text-base font-semibold rounded-lg hover:stroke-white bg-red-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleEditClick(
                          data.id,
                          data.purpose,
                          data.mobNumber,
                          data.officer
                        )
                      }
                      className="text-blue-500 hover:underline text-xs sm:text-sm md:text-base"
                    >
                      Edit
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
