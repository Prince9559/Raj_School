
import { FiUpload } from 'react-icons/fi';
import React from 'react'
import FloatingLabelInput from '../FloatingLabelInput';

const FatherDetails = ({ formData, setFormData }) => {
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
            <h2 className="text-sm font-bold mb-4">Father's Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <div>
                    <FloatingLabelInput
                        label="Father's Name"
                        id="fatherName"
                        required={true}
                        value={formData.fatherName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Father's Qualification"
                        id="fatherQualification"
                        required={false}
                        value={formData.fatherQualification}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Father's Occupation"
                        id="fatherOccupation"
                        required={false}
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Father's Designation"
                        id="fatherDesignation"
                        required={false}
                        value={formData.fatherDesignation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Father's Office Address"
                        id="fatherOfficeAddress"
                        required={false}
                        value={formData.fatherOfficeAddress}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Father's Mobile No."
                        id="fatherMobileNo"
                        required={false}
                        value={formData.fatherMobileNo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Father's Email Id"
                        id="fatherEmailId"
                        required={false}
                        value={formData.fatherEmailId}
                        onChange={handleChange}
                    />
                </div>
                <div className="p-3">
                    <label htmlFor="fatherphoto" className="block text-gray-700 font-medium mb-2">
                        Choose Father's Photo 
                        <FiUpload className="inline-block ml-2" /> {/* Upload icon */}
                    </label>
                    <input 
                    type="file"
                    id="fatherphoto"
                    name="fatherphoto"
                    className="block w-full mb-1 text-xs text-gray-900 border-b-2 rounded-none border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-500 focus:outline-none dark:placeholder-gray-200"  
                    onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">File size should not be more than 1 MB.</p>
                </div>
            </div>
        </div>
    );
};

export default FatherDetails;