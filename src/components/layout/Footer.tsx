import React from 'react';
import { Shield, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-4 text-gray-400 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-3 md:mb-0">
            <Lock size={16} className="text-blue-400" />
            <span>SecurePrint Biometric System v2.5.1</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Shield size={14} className="text-green-400" />
              <span>System Status: Online</span>
            </div>
            <div>© 2025 SecurePrint Technologies</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;