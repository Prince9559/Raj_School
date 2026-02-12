import FloatingLabelInput from "../FloatingLabelInput";
import { FiUpload } from 'react-icons/fi';
import React from 'react'

const MotherDetails = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    return (
        <div className="px-4 lg:px-0">
            <h2 className="text-sm font-bold mb-4">Mother's Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <div>
                    <FloatingLabelInput
                        label="Mother's Name"
                        id="motherName"
                        required={true}
                        value={formData.motherName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Mother's Qualification"
                        id="motherQualification"
                        required={false}
                        value={formData.motherQualification}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Mother's Occupation"
                        id="motherOccupation"
                        required={false}
                        value={formData.motherOccupation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Mother's Designation"
                        id="motherDesignation"
                        required={false}
                        value={formData.motherDesignation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Mother's Office Address"
                        id="motherOfficeAddress"
                        required={false}
                        value={formData.motherOfficeAddress}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Mother's Mobile No."
                        id="motherMobileNo"
                        required={false}
                        value={formData.motherMobileNo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Mother's Email Id"
                        id="motherEmailId"
                        required={false}
                        value={formData.motherEmailId}
                        onChange={handleChange}
                    />
                </div>

                <div className="p-3">
                    <label htmlFor="motherphoto" className="block text-gray-700 font-medium mb-2">
                        Choose Mother's Photo 
                        <FiUpload className="inline-block ml-2" /> {/* Upload icon */}
                    </label>
                    <input 
                    type="file"
                    id="motherphoto"
                    name="motherphoto"
                    className="block w-full mb-1 text-xs text-gray-900 border-b-2 rounded-none border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-500 focus:outline-none dark:placeholder-gray-200"  
                    onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">File size should not be more than 1 MB.</p>
                </div>

            </div>
        </div>
    );
};

export default MotherDetails;