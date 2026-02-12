import React from 'react'

const SubmissionSuccess = (submitID) => {
    console.log(submitID.submitID)
    return (
        <div className="px-4 lg:px-0 text-center">
            <h2 className="text-lg font-bold mb-4">Complete:</h2>
            <div className="flex justify-center">
                <img
                    // src="/public/check.png"
                    // src="/public/completed-task.png"
                    // src="/public/completed.png"
                    src="/done.png"
                    alt="Submitted Successfully"
                    className="w-1/3 h-72 mb-4"
                    // className="w-1/3 h-72 mb-4"
                />
            </div>
            <h3 className="text-xl font-bold mb-2">Submitted Successfully</h3>
            <p className="text-gray-600 mb-4">You have successfully submitted your details.</p>
            <p className="text-lg font-bold">
                Your <span className="font-normal">Registration No. is </span>
                <span className="font-bold">{submitID?.submitID}</span>
            </p>
        </div>
    );
};

export default SubmissionSuccess;