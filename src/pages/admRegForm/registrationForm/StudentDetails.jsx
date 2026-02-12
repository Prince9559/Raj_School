
import { FiUpload } from 'react-icons/fi';
import React, { useState } from 'react'
import FloatingLabelInput from '../FloatingLabelInput';
import FloatingLabelSelect from '../FloatingLabelSelect';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import FloatingLabelDatePicker from '../../../component/ResponsiveDatePicker';

const StudentDetails = ({ formData, setFormData, setStudentName }) => {

    const [hasSibling, setHasSibling] = useState(false);


    const handleCheckboxChange = () => {
        setHasSibling(!hasSibling);
    };
    const handleDateChange = (date) => {
        if (date && date.isValid()) {
            setFormData({
                ...formData,
                dob: date.format("YYYY/MM/DD"), // Store the Dayjs object in the state
            });
        } else {
            setFormData({
                ...formData,
                dob: "", // Reset the date if it's not valid
            });
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    console.log("formData StudentDetails =", formData);

    return (
        <div className="px-4 lg:px-0">
            <h2 className="text-sm font-bold mb-4">Student Details:</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">

                <FloatingLabelSelect
                    label="Academic Year"
                    id="academicYear"
                    required
                    value={formData.academicYear}
                    onChange={handleChange}
                    options={[
                        {},
                        { value: '2025-2026', label: '2025-2026' },
                    ]}
                />
                <FloatingLabelSelect
                    label="Class"
                    id="class"
                    required
                    value={formData.class}
                    onChange={handleChange}
                    options={[
                        { value: 'PG', label: 'PG' },
                        { value: 'Nur', label: 'Nursery' },
                        { value: 'Lkg', label: 'LKG' },
                        { value: 'Ukg', label: 'UKG' },
                        { value: '1', label: 'Class 1' },
                        { value: '2', label: 'Class 2' },
                        { value: '3', label: 'Class 3' },
                        { value: '4', label: 'Class 4' },
                        { value: '5', label: 'Class 5' },
                        { value: '6', label: 'Class 6' },
                        { value: '7', label: 'Class 7' },
                        { value: '8', label: 'Class 8' },
                        { value: '9', label: 'Class 9' },
                        { value: '11', label: 'Class 11' },
                    ]}
                />
                <FloatingLabelInput
                    label="First Name"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => {
                        handleChange(e);
                        setStudentName(e.target.value);

                    }}
                />
                <FloatingLabelInput
                    label="Middle Name"
                    id="middleName"
                    required={false}
                    value={formData.middleName}
                    onChange={handleChange}
                />
                <FloatingLabelInput
                    label="Last Name"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <FloatingLabelDatePicker
                    label="Select Date of Birth"
                    id="dob"
                    required={true}
                    value={formData.dob}
                    onChange={(date) => setFormData({ ...formData, dob: dayjs(date).format('YYYY-MM-DD') })}
                />

                {/* <FloatingLabelInput
                    label="Date of Birth"
                    id="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    type="date"
                /> */}
                <FloatingLabelInput
                    label="Aadhaar No."
                    id="aadhaarNo"
                    required={false}
                    value={formData.aadhaarNo}
                    onChange={handleChange}
                />
                <FloatingLabelSelect
                    label="Gender"
                    id="gender"
                    required
                    value={formData.gender || ''}
                    onChange={handleChange}
                    options={[
                        {},
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other' },
                    ]}
                />
                <FloatingLabelInput
                    label="Primary Mobile No."
                    id="primaryMobileNo"
                    required={false}
                    value={formData.primaryMobileNo}
                    onChange={handleChange}
                />
                <FloatingLabelInput
                    label="WhatsApp Mobile No."
                    id="whatsappMobileNo"
                    required={false}
                    value={formData.whatsappMobileNo}
                    onChange={handleChange}
                />
                <FloatingLabelInput
                    label="Email Id"
                    id="emailId"
                    required
                    value={formData.emailId}
                    onChange={handleChange}
                    type="email"
                />
                <FloatingLabelSelect
                    label="Category"
                    id="category"
                    required={false}
                    value={formData.category}
                    onChange={handleChange}
                    options={[
                        {},
                        { value: 'General', label: 'General' },
                        { value: 'OBC', label: 'OBC' },
                        { value: 'SC', label: 'SC' },
                        { value: 'ST', label: 'ST' },
                    ]}
                />
                <FloatingLabelSelect
                    label="Religion"
                    id="religion"
                    required={false}
                    value={formData.religion}
                    onChange={handleChange}
                    options={[
                        {},
                        { value: 'Hindu', label: 'Hindu' },
                        { value: 'Muslim', label: 'Muslim' },
                        { value: 'Christian', label: 'Christian' },
                        { value: 'Sikh', label: 'Sikh' },
                        { value: 'Other', label: 'Other' },
                    ]}
                />
                <FloatingLabelSelect
                    label="Blood Group"
                    id="bloodGroup"
                    required={false}
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    options={[
                        {},
                        { value: 'A+', label: 'A+' },
                        { value: 'A-', label: 'A-' },
                        { value: 'B+', label: 'B+' },
                        { value: 'B-', label: 'B-' },
                        { value: 'O+', label: 'O+' },
                        { value: 'O-', label: 'O-' },
                        { value: 'AB+', label: 'AB+' },
                        { value: 'AB-', label: 'AB-' },
                    ]}
                />
                <FloatingLabelSelect
                    label="Nationality"
                    id="nationality"
                    required={false}
                    value={formData.nationality}
                    onChange={handleChange}
                    options={[
                        {},
                        { value: 'Indian', label: 'Indian' },
                    ]}
                />
                <FloatingLabelInput
                    label="Previous School"
                    id="previousSchool"
                    required={false}
                    value={formData.previousSchool}
                    onChange={handleChange}
                />
                <FloatingLabelSelect
                    label="Sports"
                    id="sports"
                    required={false}
                    value={formData.sports}
                    onChange={handleChange}
                    options={[
                        {},
                        { value: 'Cricket', label: 'Cricket' },
                        { value: 'Football', label: 'Football' },
                        { value: 'Basketball', label: 'Basketball' },
                    ]}
                />

                <div className="p-3">
                    <label htmlFor="studentphoto" className="block text-gray-700 font-medium mb-2">
                        Choose Student Photo <span className="text-red-500">*</span>
                        <FiUpload className="inline-block ml-2" /> {/* Upload icon */}
                    </label>
                    <input
                        type="file"
                        id="studentphoto"
                        name="studentphoto"
                        className="block w-full mb-1 text-xs text-gray-900 border-b-2 rounded-none border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-500 focus:outline-none dark:placeholder-gray-200"
                        onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">File size should not be more than 1 MB.</p>
                </div>

            </div>

            <div className="relative mt-6 mx-5 flex gap-3">
                <label htmlFor="hasSibling" className="text-gray-600 font-semibold">
                    Sibling (Real Brother/Sister) only studying in same school
                </label>
                <input
                    type="checkbox"
                    id="hasSibling"
                    name="hasSibling"
                    className="mr-2"
                    checked={hasSibling}
                    onChange={handleCheckboxChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {hasSibling && (
                    <>
                        <FloatingLabelInput
                            label="Sibling Admission No."
                            id="siblingAdmissionNo"
                            required={false}
                            value={formData.siblingAdmissionNo}
                            onChange={handleChange}
                            className="duration-1000"
                        />
                        <FloatingLabelInput
                            label="Sibling Name"
                            id="siblingName"
                            required={false}
                            value={formData.siblingName}
                            onChange={handleChange}
                        />
                        <FloatingLabelInput
                            label="Sibling Class"
                            id="siblingClass"
                            required={false}
                            value={formData.siblingClass}
                            onChange={handleChange}
                        />
                    </>
                )}
            </div>

        </div>
    );
};

export default StudentDetails;