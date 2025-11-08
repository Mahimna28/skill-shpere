import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="text-lg font-semibold text-white mb-3">Skill Sphere</h5>
          <p className="text-sm">Connected, intelligent learning.</p>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-3">Platform</h5>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="/courses" className="hover:text-white">Courses</a></li>
            <li><a href="/ai-tutor" className="hover:text-white">AI Tutor</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-3">Company</h5>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-3">Legal</h5>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Skill Sphere. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;