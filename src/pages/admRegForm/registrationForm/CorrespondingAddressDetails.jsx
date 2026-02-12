import React from 'react'
import FloatingLabelInput from '../FloatingLabelInput';


const CorrespondingAddressDetails = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="px-4 lg:px-0">
            <h2 className="text-sm font-bold mb-4">Corresponding Address:</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                <div>
                    <FloatingLabelInput
                        label="Corresponding Address"
                        id="correspondingAddress"
                        required={true}
                        value={formData.correspondingAddress}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Country"
                        id="correspondingCountry"
                        required={false}
                        value={formData.correspondingCountry}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="State"
                        id="correspondingState"
                        required={false}
                        value={formData.correspondingState}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="City"
                        id="correspondingCity"
                        required={false}
                        value={formData.correspondingCity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FloatingLabelInput
                        label="Pin Code"
                        id="correspondingPinCode"
                        required={false}
                        value={formData.correspondingPinCode}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CorrespondingAddressDetails;