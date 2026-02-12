import React from 'react'

const UploadDocuments = ({ formData, setFormData, setUpload, upload }) => {
    const handleChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    return (
        <div className="px-4 lg:px-0">
            <h2 className="text-sm text-[#343A78] font-bold bg-[#F5F7F9] py-2.5 px-0 flex items-center mb-1.25 -ml-1.5">&nbsp;&nbsp;&nbsp;Documents Details:</h2>
            <br></br>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label htmlFor="childAadhaar">Child Aadhaar <span className="text-red-500 mr-2">*</span></label>
                    <input type="file" id="childAadhaar" name="childAadhaar" className=" border p-2 mt-1" onChange={handleChange} />
                    <p className="text-sm text-red-500 mt-1">All file sizes should not be more than 1 MB and should be in png, jpg, pdf.</p>
                    <br></br>
                </div>
            </div>

            <h2 className="text-sm text-[#343A78] font-bold bg-[#F5F7F9] py-2.5 px-0 flex items-center mb-1.25 -ml-1.5">&nbsp;&nbsp;&nbsp; Declaration by the Parent / Guardian:</h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center">
                <svg xmlns='http://www.w3.org/2000/svg' width="20" height="20" viewBox='0 0 24 24' fill='#FF492C' class="min-w-[30px] min-h-[20px]">
                <path d='M21 12 3 19l4-7-4-7 18 7z'></path>
            </svg>
                    <label htmlFor="declaration1">I understand that incomplete application form will not be considered.</label>
                </div>
                <div className="flex items-center">
                <svg xmlns='http://www.w3.org/2000/svg' width="20" height="20" viewBox='0 0 24 24' fill='#FF492C' class=" min-w-[30px] min-h-[20px]">
                <path d='M21 12 3 19l4-7-4-7 18 7z'></path>
            </svg>
                    <label htmlFor="declaration2">I affirm to abide by the rules & regulations laid down or amended by the authorities of the School.</label>
                </div>
                <div className="flex items-center">
                <svg xmlns='http://www.w3.org/2000/svg' width="20" height="20" viewBox='0 0 24 24' fill='#FF492C' class="min-w-[30px] min-h-[20px]">
                <path d='M21 12 3 19l4-7-4-7 18 7z'></path>
            </svg>
                    <label htmlFor="declaration3">I hereby confirm that the details in this form are true and correct to the best of my knowledge.</label>
                </div>
                <div className="flex items-center mt-4">
                    <input 
                    type="checkbox" 
                    id="agree" 
                    name="agree" 
                    className="mr-2" 
                    onChange={(e) => setUpload(e.target.checked ? true : false)}
                    />
                    <label htmlFor="agree">I Agree</label>
                </div>
            </div>
        </div>
    );
};

export default UploadDocuments;