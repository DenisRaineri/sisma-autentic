import React from 'react';
import Modal from '../common/Modal';
import { Info, Lock, Code, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="About SecurePrint"
      size="md"
    >
      <div className="text-gray-300">
        <div className="flex items-center mb-6">
          <Lock size={48} className="text-blue-500 mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-white">SecurePrint</h2>
            <p className="text-blue-400">Biometric Access Control System</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2 text-blue-400">
              <Info size={18} className="mr-2" />
              <h3 className="text-lg font-medium">Application Info</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Version:</span>
                <span className="text-blue-300">2.5.1</span>
              </li>
              <li className="flex justify-between">
                <span>Build:</span>
                <span className="text-blue-300">20250412.1</span>
              </li>
              <li className="flex justify-between">
                <span>Release Date:</span>
                <span className="text-blue-300">April 12, 2025</span>
              </li>
              <li className="flex justify-between">
                <span>License:</span>
                <span className="text-blue-300">Enterprise</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2 text-blue-400">
              <Code size={18} className="mr-2" />
              <h3 className="text-lg font-medium">Technical Details</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>SDK:</span>
                <span className="text-blue-300">BioScan SDK 4.0</span>
              </li>
              <li className="flex justify-between">
                <span>Framework:</span>
                <span className="text-blue-300">React 18.3</span>
              </li>
              <li className="flex justify-between">
                <span>Database:</span>
                <span className="text-blue-300">SecureDB 2025</span>
              </li>
              <li className="flex justify-between">
                <span>Encryption:</span>
                <span className="text-blue-300">AES-256</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center mb-2 text-blue-400">
            <Heart size={18} className="mr-2" />
            <h3 className="text-lg font-medium">Development Team</h3>
          </div>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>Lead Developer:</span>
              <span className="text-blue-300">Alex Chen</span>
            </li>
            <li className="flex justify-between">
              <span>Security Architect:</span>
              <span className="text-blue-300">Maria Rodriguez</span>
            </li>
            <li className="flex justify-between">
              <span>UI/UX Designer:</span>
              <span className="text-blue-300">Sam Taylor</span>
            </li>
            <li className="flex justify-between">
              <span>QA Engineer:</span>
              <span className="text-blue-300">Jordan Kim</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>© 2025 SecurePrint Technologies. All rights reserved.</p>
          <p className="mt-1">Confidential and Proprietary.</p>
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;