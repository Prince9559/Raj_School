import React, { useState } from "react";
import Generalinfo from "../component/Generalinfo";
import Docsinfo from "../component/Docsinfo";
import Academics from "../component/Academics";
import Staff from "../component/Staff";
import SchoolDetails from "../component/SchoolDetails.jsx";
import Class10result  from "../component/class10result.jsx";
import Class12result from "../component/class12result.jsx";

function MandatoryDis() {
  return (
    <div className="pt-[170px] flex flex-col gap-20 justify-center">
      {/* A. General Information */}
      <div>
        <Generalinfo />
      </div>
      {/* B. DOCUMENTS AND INFORMATION */}
      <div>
        <Docsinfo />
      </div>
      {/* RESULT AND ACADEMICS */}
      <div>
        <Academics />
      </div>
      <div>
        <Class10result />
      </div>
      <div>
        <Class12result />
      </div>
      {/* STAFF */}
      <div>
        <Staff />
      </div>
      <div>
        <SchoolDetails />
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s;
        }
      `}</style>
    </div>
  );
}

export default MandatoryDis;
