import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { defaultSchoolCode } from "../main";
import { useCookies } from "react-cookie";

function Class10() {
    const [infoTable, setInfoTable] = useState([]);
    const [newRow, setNewRow] = useState({
        schoolCode: defaultSchoolCode,
        classname: "10",
        year: "",
        no_of_stu_registered: "",
        no_of_stu_passed: "",
        stu_pass_percent: "",
        remarks: "",
    });

    const [allCookie] = useCookies(["tokenByAnshCloud"]);
    const token = allCookie.tokenByAnshCloud || null;

    useEffect(() => {
        async function getData() {
            const data = await axios
                .post("/class/get_class_result", {
                    schoolCode: defaultSchoolCode,
                    classname: "10",
                })
                .then((res) => res.data.data);
            setInfoTable(data);
        }
        getData();
    }, []);
    const { user } = useContext(UserContext);

    const handleDeleteClick = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await axios.post(
                "/class/delete_class_result",
                { id }, // Sending only the ID to delete
                config
            );

            if (response.status === 200) {
                alert("Data deleted successfully");
                setInfoTable((prevTable) =>
                    prevTable.filter((data) => data.id !== id)
                );
            } else {
                alert("Failed to delete data");
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            alert("An error occurred while deleting the data");
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow((prevRow) => ({
            ...prevRow,
            [name]: value,
        }));
    };

    const handleInsertClick = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post("/class/insert_class_result", newRow, config);

        if (response.status === 200) {
            alert("Data inserted successfully");
            setInfoTable((prevTable) => [...prevTable, newRow]);
            setNewRow({
                schoolCode: defaultSchoolCode,
                classname: "10",
                year: "",
                no_of_stu_registered: "",
                no_of_stu_passed: "",
                stu_pass_percent: "",
                remarks: "",
            });
        } else {
            alert("Failed to insert data");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <table className="border-collapse w-4/5 shadow-lg bg-white">
                <thead>
                    <tr>
                        <th colSpan="5" className="px-4 py-3 bg-red-500 text-white text-center">
                            CLASS X RESULT
                        </th>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Year</th>
                        <th className="px-4 py-2">No of Students Registered</th>
                        <th className="px-4 py-2">No of Students Passed</th>
                        <th className="px-4 py-2">Pass Percentage</th>
                        <th className="px-4 py-2">Remarks</th>
                        {user && (
                <th className="px-4 py-2 text-center">Actions</th>
            )}
                    </tr>
                </thead>
                <tbody>
                    {infoTable.map((data) => (
                        <tr key={data.id} className="even:bg-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2 text-center align-middle">{data.year}</td>
                            <td className="px-4 py-2 text-center align-middle">{data.no_of_stu_registered}</td>
                            <td className="px-4 py-2 text-center align-middle">{data.no_of_stu_passed}</td>
                            <td className="px-4 py-2 text-center align-middle">{data.stu_pass_percent}</td>
                            <td className="px-4 py-2 text-center align-middle">{data.remarks}</td>
                            
                            {user && (
                            <td className="px-4 py-2">
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDeleteClick(data.id)}
                                >
                                    Delete
                                </button>

                            </td>
                            )}
                        </tr>
                    ))}
                    {user && (
                    <tr>

                        <td>
                            <input
                                type="text"
                                name="year"
                                value={newRow.year}
                                placeholder="Year"
                                className="border p-2"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="no_of_stu_registered"
                                value={newRow.no_of_stu_registered}
                                placeholder="Students Registered"
                                className="border p-2"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="no_of_stu_passed"
                                value={newRow.no_of_stu_passed}
                                placeholder="Students Passed"
                                className="border p-2"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="stu_pass_percent"
                                value={newRow.stu_pass_percent}
                                placeholder="Pass Percentage"
                                className="border p-2"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="remarks"
                                value={newRow.remarks}
                                placeholder="Remarks"
                                className="border p-2"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleInsertClick}
                            >
                                Insert
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


export default Class10;
