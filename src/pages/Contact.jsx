import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"; // Importing icons
import ContactBox from "../component/ContactBox";

function Contact() {
  return (
    <div className="mt-[100px]">
      {/* Map and Contact Information Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Contact Information Section */}
        <div className="flex-1 lg:w-1/2 lg:pr-10 flex flex-col pl-8 justify-center">
          <h2 className="font-bold text-2xl mb-6">RAJ ENGLISH SCHOOL</h2>
          <div className="space-y-4 text-lg">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-3 text-red-500" />
              <span>Shivpurva, PO- Sarnath, Varanasi, U.P.</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-3 text-red-500" />
              <span>Email: rajschoolvns@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-3 text-red-500" />
              <span>Mobile: 7703004334, 8574476806 & 7905966606</span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex-1 p-10 lg:w-1/2">
          <iframe
            className="w-full h-96 border border-gray-300 rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1802.4362750369712!2d83.0100431!3d25.3755876!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2ec24786806f%3A0x39898e8d0b2c4919!2sRaj%20English%20School!5e0!3m2!1sen!2sin!4v1705314268633!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* ContactBox Section */}
      <div className="mt-10 p-10">
        <ContactBox />
      </div>
    </div>
  );
}

export default Contact;
