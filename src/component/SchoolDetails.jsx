import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { defaultSchoolCode } from "../main";
import { useCookies } from "react-cookie";

function Staff() {
    const [infoTable, setInfoTable] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedField, setEditedField] = useState({
        colName: "",
        colValue: "",
    });

    const [allCookie, setAllCookie] = useCookies(["tokenByAnshCloud"]);
    // console.log("allCookie :", allCookie);
    const token = allCookie.tokenByAnshCloud || null;

    useEffect(() => {
        async function getData() {
            const data = await axios
                .post("/infra/get_infra", {
                    schoolCode: defaultSchoolCode,
                })
                .then((res) => res.data.data);
            setInfoTable(data);
        }
        getData();
    }, []);

    const { user } = useContext(UserContext);

    const handleEditClick = (id, colName, colValue) => {
        setIsEditing(true);
        setEditedField({ id, colName, colValue });
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
            "/infra/update_infra",
            {
                schoolCode: defaultSchoolCode,
                colName: editedField.colName,
                colValue: editedField.colValue,
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
            if (data.colName === editedField.colName) {
                return {
                    ...data,
                    colName: editedField.colName,
                    colValue: editedField.colValue,
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
                                SCHOOL &nbsp;  &nbsp; &nbsp;INFRASTRUCTURE
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
                                SCHOOL&nbsp; &nbsp;INFRASTRUCTURE
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
                                        name="colName"
                                        value={editedField.colName}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    data.colName
                                )}
                            </td>
                            <td className="px-4 py-2 animate-fadeIn">
                                {isEditing && editedField.id === data.id ? (
                                    <input
                                        type="text"
                                        name="colValue"
                                        value={editedField.colValue}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    data.colValue
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
                                                    data.colName,
                                                    data.colValue
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
