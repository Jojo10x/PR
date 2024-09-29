import React from 'react';
import { FiClock, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-gray-300 mt-16 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Open Hours</h4>
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <p>Monday - Friday 10:00 AM — 7:00 PM</p>
          </div>
          <p className="mt-2 text-gray-400">Closed on Holidays</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          <div className="flex items-center mb-2">
            <FiPhone className="mr-2" />
            <p>+260 77 270 9299</p>
          </div>
          <div className="flex items-center">
            <FiMail className="mr-2" />
            <p>pamasolaresources@gmail.com</p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Address</h4>
          <div className="flex items-start">
            <FiMapPin className="mr-2 mt-1" />
            <p>3331/917 Off Paul Ngozi Road, Kamwala South, Lusaka, Zambia</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 pt-8 border-t border-gray-700">
        <p className="text-sm">&copy; {new Date().getFullYear()} Pamasola Resources. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;