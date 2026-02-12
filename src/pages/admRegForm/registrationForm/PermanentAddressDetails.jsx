import FloatingLabelInput from "../FloatingLabelInput";
import React from 'react'

const PermanentAddressDetails = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="px-4 lg:px-0">
            <h2 className="text-sm font-bold mb-4">Permanent Address:</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                <div>
                    <FloatingLabelInput
                        label="Permanent Address"
                        id="permanentAddress"
                        required={true}
                        value={formData.permanentAddress}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Country"
                        id="permanentCountry"
                        required={false}
                        value={formData.permanentCountry}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="State"
                        id="permanentState"
                        required={false}
                        value={formData.permanentState}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="City"
                        id="permanentCity"
                        required={false}
                        value={formData.permanentCity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Pin Code"
                        id="permanentPinCode"
                        required={false}
                        value={formData.permanentPinCode}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PermanentAddressDetails;