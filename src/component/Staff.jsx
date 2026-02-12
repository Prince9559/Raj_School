import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { defaultSchoolCode } from "../main";
import { useCookies } from "react-cookie";

function Staff() {
  const [infoTable, setInfoTable] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState({
    staffType: "",
    staffValue: "",
  });

  const [allCookie, setAllCookie] = useCookies(["tokenByAnshCloud"]);
  // console.log("allCookie :", allCookie);
  const token = allCookie.tokenByAnshCloud || null;

  useEffect(() => {
    async function getData() {
      const data = await axios
        .post("/get_staff", {
          schoolCode: defaultSchoolCode,
        })
        .then((res) => res.data);
      setInfoTable(data);
    }
    getData();
  }, []);

  const { user } = useContext(UserContext);

  const handleEditClick = (id, staffType, staffValue) => {
    setIsEditing(true);
    setEditedField({ id, staffType, staffValue });
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
      "/update_staff_details",
      {
        schoolCode: defaultSchoolCode,
        staffType: editedField.staffType,
        staffValue: editedField.staffValue,
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
      if (data.staffType === editedField.staffType) {
        return {
          ...data,
          staffType: editedField.staffType,
          staffValue: editedField.staffValue,
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
    <div className="flex justify-center items-center ">
      <table id="" className="border-collapse w-4/5 shadow-lg bg-white">
        {window.innerWidth < 768 && (
          <thead>
            <tr>
            <th
                colSpan="3"
                className="px-4 py-3 bg-red-500 text-white text-center"
              >
                STAFF &nbsp;  &nbsp; &nbsp;INFORMATION
              </th>
            </tr>
          </thead>
        )}
        {window.innerWidth > 768 && (
          <thead>
            <tr>
              <th
                colSpan="3"
                className="px-4 py-3 bg-red-500 text-white text-center"
              >
                STAFF&nbsp; &nbsp;INFORMATION
              </th>
            </tr>
          </thead>
        )}

        <tbody>
          {infoTable.map((data) => (
            <tr
              key={data.id}
              className='transition-transform ease-in-out duration-300 even:bg-gray-200 hover:bg-gray-100 hover:scale-95 "
           '
            >
              <td className="px-4 py-2 animate-fadeIn">
                {isEditing && editedField.id === data.id ? (
                  <input
                    type="text"
                    name="staffType"
                    value={editedField.staffType}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.staffType
                )}
              </td>
              <td className="px-4 py-2 animate-fadeIn">
                {isEditing && editedField.id === data.id ? (
                  <input
                    type="text"
                    name="staffValue"
                    value={editedField.staffValue}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.staffValue
                )}
              </td>
              {user && (
                <td className="px-4 py-2 animate-fadeIn">
                  {isEditing ? (
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => handleSaveClick(data.id)}
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleEditClick(
                          data.id,
                          data.staffType,
                          data.staffValue
                        )
                      }
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

export default Staff;
